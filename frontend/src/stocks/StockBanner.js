import React from 'react';
import { Link } from 'react-router-dom';
import './StockBanner.css';
import getColorClass from '../general/StockColorChange';

const StockBanner = ({ stocks }) => {
    const getArrowClass = changeAmount => {
        return changeAmount > 0 ? 'arrow-up' : 'arrow-down';
    };

    return (
        <div className="stock-banner">
            {stocks && stocks.map((stock, index) => (
                    <div className="stock-item" key={index}> 
                        <Link className="stockItem-link" to={`/stocks/${stock.ticker}`}>
                            <p className={`ticker ${getArrowClass(stock.change_amount)}`}>
                                {stock.ticker}
                                {stock.change_amount > 0 && <span className="arrow">&uarr;</span>}
                                {stock.change_amount < 0 && <span className="arrow">&darr;</span>}
                            </p>
                            <p className="price">${Number(stock.price).toFixed(2)}</p>
                            <p className="change-amount">${Number(stock.change_amount).toFixed(3)}</p>
                            <p id="change-percentage" className={getColorClass(stock.change_percentage)} >({parseFloat(stock.change_percentage).toFixed(2)}%)</p>
                        </Link>
                    </div>
            ))}
        </div>
    );
};

export default StockBanner;

