import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../authentication/UserContext";
import BackendApi from "../api/BackendApi";
import getColorClass from "../general/StockColorChange";

const YourComponent = () => {
  const [quoteData, setQuoteData] = useState({});
  const [savedStocks, setSavedStocks] = useState([]);
  const { currentUser } = useContext(UserContext);
  const apiKey = "4F1FTATYMOBRU07T"; // Replace "your_api_key" with your actual Alpha Vantage API key

  useEffect(() => {
    const fetchSavedStockData = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const stocks = await BackendApi.getSavedStocks(currentUser.username);
        setSavedStocks(stocks);

        const stockDataPromises = stocks.map(async (stock) => {
          try {
            const response = await axios.get("https://www.alphavantage.co/query", {
              params: {
                function: "GLOBAL_QUOTE",
                symbol: stock.symbol,
                apikey: apiKey,
              },
            });
            setQuoteData((prevQuoteData) => ({
              ...prevQuoteData,
              [stock.symbol]: response.data,
            }));
          } catch (error) {
            console.error("Error fetching stock data for", stock.symbol, ":", error);
          }
        });

        await Promise.all(stockDataPromises);
      } catch (error) {
        console.error("Error fetching saved stocks:", error);
      }
    };

    fetchSavedStockData();
  }, [currentUser]);

  return (
    <div>
      <h2>Your Watch List</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>$Change</th>
            <th>%Change</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {savedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              {quoteData[stock.symbol] && (
                <>
                  <td>{quoteData[stock.symbol]["Global Quote"]["05. price"]}</td>
                  <td>{quoteData[stock.symbol]["Global Quote"]["09. change"]}</td>
                  <td className={getColorClass(quoteData[stock.symbol]["Global Quote"]["10. change percent"])}>{quoteData[stock.symbol]["Global Quote"]["10. change percent"]}</td>
                  <td>{quoteData[stock.symbol]["Global Quote"]["06. volume"]}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;




