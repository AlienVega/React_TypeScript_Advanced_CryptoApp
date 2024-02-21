import React, { useContext } from "react";
import { CryptoContext } from "../content/CryptoContext";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import Paginationn from "./Paginationn";

const TableComponent: React.FC = () => {
  let { cryptoData, currency } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">Assets</th>
                <th className="py-1">Name</th>
                <th className="py-1">Price</th>
                <th className="py-1">Total Volume</th>
                <th className="py-1">Market Cap Change</th>
                <th className="py-1">1H</th>
                <th className="py-1">24H</th>
                <th className="py-1">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                  >
                    <td className="py-4 flex items-center uppercase">
                      <button className="outline-0 border-0 bg-none cursor-pointer">
                        <StarOutlineOutlinedIcon className="w-[1.5rem] m1-1.5 fill-gray-100 hover:fill-cyan" />
                      </button>
                      <img
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={data.image}
                        alt={data.name}
                      />
                      <span>{data.symbol}</span>
                    </td>
                    <td className="py-4">{data.name}</td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-TR", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4">{data.total_volume}</td>
                    <td className="py-4">
                      {data.market_cap_change_percentage_24h}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency > 0
                          ? "text-green py-4"
                          : "text-red py-4"
                      }
                    >
                      {Number(
                        data.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency > 0
                          ? "text-green py-4"
                          : "text-red py-4"
                      }
                    >
                      {Number(
                        data.price_change_percentage_24h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency > 0
                          ? "text-green py-4"
                          : "text-red py-4"
                      }
                    >
                      {Number(
                        data.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
      <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span>
          Data provided by
          <a
            className="text-cyan"
            href="http://www.coingecko.com"
            target="_blank"
            rel="noreferrer"
          >
            CoinGecko
          </a>
        </span>
        <Paginationn />
      </div>
    </>
  );
};

export default TableComponent;
