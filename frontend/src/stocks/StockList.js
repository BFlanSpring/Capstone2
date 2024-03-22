import React, { useEffect, useState } from 'react';
import SearchForm from '../general/SearchForm';
import StockCard from './StockCard';
import "./StockCard.css";

function StockList({ searchResults, fetchStocks }) {
    console.debug('StockList');

    const [searchPerformed, setSearchPerformed] = useState(false);

    // useEffect to fetch data initially and when searchResults change
    useEffect(() => {
        console.debug('StockList useEffect');
        if (searchResults) {
            setSearchPerformed(true);
        }
    }, [searchResults]);

    const handleSearchSubmit = (query) => {
        fetchStocks(query, '4F1FTATYMOBRU07T'); // Pass the query and API key '4F1FTATYMOBRU07T'
        setSearchPerformed(true); // Set searchPerformed to true when search is performed
    };
    
    console.log('SearchResults in StockList:', searchResults); // Log the searchResults

    return (
        <div className="StockList">
            <SearchForm searchFor={handleSearchSubmit} /> {/* Pass handleSearchSubmit as prop */}
            {searchPerformed && searchResults && searchResults.length > 0 ? (
                <div className="StockList-list">
                    {searchResults.map((result) => (
                        <StockCard
                            key={result['1. symbol']}
                            symbol={result['1. symbol']}
                            name={result['2. name']}
                            type={result['3. type']}
                            region={result['4. region']}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default StockList;



