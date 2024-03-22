import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StockInfo = () => {
  const [stockData, setStockData] = useState(null);
  const { symbol } = useParams();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query',
          {
            params: {
              function: 'TIME_SERIES_INTRADAY',
              symbol: symbol,
              interval: '5min',
              apikey: '4F1FTATYMOBRU07T',
            },
          }
        );
        console.log(response.data);
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <h2>Stock Information</h2>
      {stockData ? (
        <div>
          <div>
            <p>Symbol: {stockData['Meta Data']['2. Symbol']}</p>
            <p>Last Refreshed: {stockData['Meta Data']['3. Last Refreshed']}</p>
          </div>
          {Object.entries(stockData['Time Series (5min)']).map(([time, data], index) => (
            <div key={index}>
              <h3>{time}</h3>
              <ul>
                {Object.entries(data).map(([key, value], idx) => (
                  <li key={idx}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  

  // return (
  //   <div>
  //     <h2>Stock Information</h2>
  //       <div>
  //         <p>Symbol: {stockData['Meta Data']['2. Symbol']}</p>
  //         <p>Last Refreshed: {stockData['Meta Data']['3. Last Refreshed']}</p>
  //       </div>
      
  //     {stockData ? (
  //       <div>
  //         {Object.entries(stockData['Time Series (5min)']).map(([time, data], index) => (
  //           <div key={index}>
  //             <h3>{time}</h3>
  //             <ul>
  //               {Object.entries(data).map(([key, value], idx) => (
  //                 <li key={idx}>
  //                   {key}: {value}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
};

export default StockInfo;

