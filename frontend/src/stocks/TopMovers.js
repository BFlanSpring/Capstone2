import React, { useState, useEffect } from 'react';
import StockBanner from './StockBanner';
import './TopMovers.css';
import StockBox from './StockBox';
import SavedStockList from './SavedStockList'; 
import NoDataPage from '../general/NoDataPage'; 


const TopMovers = () => {
  const [stocks, setStocks] = useState(null); 
  const [category, setCategory] = useState('top_gainers'); 
  const [dailyLimitReached, setDailyLimitReached] = useState(false); // State to track if daily limit is reached

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_API_KEY');
        console.log(response);
        const data = await response.json();
        console.log('Fetched data:', data);
        if (data.Information && data.Information.includes('rate limit')) {
          setDailyLimitReached(true);
        } else {
          setStocks(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const getCategoryName = (category) => {
    switch (category) {
      case 'top_gainers':
        return 'Top Gainers';
      case 'top_losers':
        return 'Top Losers';
      case 'most_actively_traded':
        return 'Most Actively Traded';
      default:
        return category;
    }
  };

  const handleCategoryChange = (newCategory) => {
    console.log('Category changed to:', newCategory);
    setCategory(newCategory);
  };

  if (dailyLimitReached ) {
    return <NoDataPage />; // Render the "no data" page if daily limit reached on the /news route
  }

  // Check if stocks is null or empty, and return null if so
  if (!stocks || Object.keys(stocks).length === 0) {
    return <NoDataPage />;
  }

  return (
    <div className="stock-list">
      {/* Render StockBanner only if stocks is not null */}
      {stocks && <StockBanner stocks={stocks.most_actively_traded} />}
      <div className='table-container'>
        <div className="category-buttons">
          <button id="table-button" onClick={() => handleCategoryChange('top_gainers')}>Top Gainers</button>
          <button id="table-button" onClick={() => handleCategoryChange('top_losers')}>Top Losers</button>
          <button id="table-button" onClick={() => handleCategoryChange('most_actively_traded')}>Most Actively Traded</button>
        </div>

        {/* Render the StockBox components if stocks[category] is not null */}
        {stocks && stocks[category] && (
          <div>
            { <h2>{getCategoryName(category)}</h2> }
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
                {stocks[category].map((stock, index) => (
                  <StockBox key={index} stock={stock} />
                ))}
              </tbody>
            </table>
          </div> 
        )}
      </div> 
      <div className='saved-stock-list'>
        <SavedStockList /> 
      </div>
    </div>
  );
};

export default TopMovers;
