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
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
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
  // sayfalama
  const [page, setPage] = useState<number>(1);
  // toplam coin
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);
  //   table all crypto get
  const getCryptoData = async () => {
    // toplam coin
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/list`
      ).then((res) => res.json().then((json) => json));
      setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinsearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
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
  const resetSearch = () => {
    setPage(1);
    setCoinSearch("");
  };
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinsearch, currency, sortBy, page, perPage]);

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
        page,
        setPage,
        totalPages,
        setTotalPages,
        resetSearch,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
