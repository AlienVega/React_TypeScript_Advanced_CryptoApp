import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import selectIcon from "../assets/select-icon.svg";
import { useContext, useRef, FormEvent } from "react";
import { CryptoContext } from "../content/CryptoContext";

const Filters: React.FC = () => {
  let { setCurreny, setSortBy } = useContext<any>(CryptoContext);
  const currencyRef = useRef<HTMLInputElement>(null);
  const handleCurrencySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currencyRef.current) {
      const val = currencyRef.current.value;
      setCurreny(val);
      currencyRef.current.value = "";
    }
  };
  const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setSortBy(value);
  };
  return (
    <div className="w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative capitalize">
      <Search />
      <div className="flex mr-7">
        <form
          className="relative flex items-center font-nunito mr-12"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2 font-bold"
          >
            Currency
          </label>
          <input
            type="text"
            ref={currencyRef}
            name="currency"
            placeholder="Usd"
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={submitIcon} alt="submit" className="w-full h-auto" />
          </button>
        </form>
        <label className="relative flex justify-center items-center">
          <span className="font-bold mr-2">Sort by</span>
          <select
            name="sortby"
            className="rounded bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-0 "
            onChange={handleSort}
          >
            <option value="market_cap_desc">market_cap_desc</option>
            <option value="market_cap_desc"> market_cap_asc</option>
            <option value="market_cap_desc"> market_cap_asc</option>
            <option value="volume_desc"> volume_desc</option>
            <option value="id_desc">id_desc</option>
            <option value="volume_asc">volume_asc</option>
          </select>
          <img
            src={selectIcon}
            alt="submit"
            className="w-[1rem] h-auto absolute right-1 top-2 pointer-events-none"
          />
        </label>
      </div>
    </div>
  );
};

export default Filters;
