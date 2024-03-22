import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../authentication/UserContext";
import './StockCard.css';

function StockCard({ symbol, name, type, region }) {
    const { handleAddStock } = useContext(UserContext); 

    const handleAddButtonClick = () => {
        handleAddStock(symbol);
    };

    return (
        <div className="StockCard-card">
            <div className="stock-card-body">
                <Link to={`/stocks/${symbol}`}>
                    <h6 className="stock-card-title">{symbol}</h6>
                </Link>
                <p className="stock-card-text">Name: {name}</p>
                <p className="stock-card-text">Type: {type}</p>
                <p className="stock-card-text">Region: {region}</p>
                <button onClick={handleAddButtonClick}>Add to Saved Stocks</button>
            </div>
        </div>
    );
}

export default StockCard;