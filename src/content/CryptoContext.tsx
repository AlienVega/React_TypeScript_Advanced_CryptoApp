import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
interface CryptoContextProps {
  cryptoData: any;
  searchData: any[] | undefined;
  getSearchResult: (query: string) => Promise<void>;
  getCryptoData: () => Promise<void>;
  setCoinSearch: Dispatch<SetStateAction<string>>;
  setSearchData: Dispatch<SetStateAction<any[] | undefined>>;
  currency: string;
  setCurreny: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

// context oluşturalım

// createContext fonksiyonuna tür parametresi ekleyerek bağlamın değer tipini belirtelim
export const CryptoContext = createContext<CryptoContextProps | undefined>(
  undefined
);
interface CryptoProviderProps {
  children: ReactNode;
}

// provider context oluşturalım

export const CryptoProvider: React.FC<CryptoProviderProps> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [searchData, setSearchData] = useState<any[] | undefined>(undefined);
  // arama kısmından girilen değere göre tabloyu filtreler
  const [coinsearch, setCoinSearch] = useState<string>("");
  // para birimine göre filtreleme
  const [currency, setCurreny] = useState<string>("usd");
  // market filtrelemesine göre
  const [sortBy, setSortBy] = useState<string>("market_cap_desc");

  //   table all crypto get
  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinsearch}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      ).then((res) => res.json().then((json) => json));

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  //   table search crypto
  const getSearchResult = async (query: string) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      ).then((res) => res.json().then((json) => json));

      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinsearch, currency, sortBy]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        getCryptoData,
        setCoinSearch,
        setSearchData,
        currency,
        setCurreny,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
