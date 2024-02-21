import { useContext, useState, ChangeEvent, FormEvent } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../content/CryptoContext";
import { debounce } from "@mui/material";
interface Coin {
  id: string;
  thumb: string;
  name: string;
}
interface CryptoContextProps {
  searchData: Coin[] | undefined;
  setCoinSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  // Diğer türleri buraya ekleyin, gerektiği gibi
}
interface SearchInputProps {
  handleSearch: (query: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState<string>("");
  let { searchData, setCoinSearch, setSearchData } =
    useContext<CryptoContextProps>(CryptoContext);
  // inputa girilen değere göre arama yapar
  let handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchText);
  };
  // filtrelenen coine tıklandığında tabloyu filtreler
  const selectCoin = (coin: string) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };
  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7 font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInput}
          value={searchText}
          type="text"
          name="search"
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
          placeholder="Search here..."
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} className="w-full h-auto" alt="search" />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md">
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex item-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    className="w-[1rem] h-[1.2rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-3">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search: React.FC = () => {
  let { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
