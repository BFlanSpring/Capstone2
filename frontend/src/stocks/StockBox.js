import React, { useContext } from "react";
import BackendApi from "../api/BackendApi";
import UserContext from "../authentication/UserContext";
import getColorClass from "../general/StockColorChange";

const StockBox = ({ stock }) => {
  const { currentUser } = useContext(UserContext); // Access currentUser from the context
  const symbol = stock.ticker;

  const handleAddButtonClick = async (e) => {
    e.preventDefault();
    

    try {
      await BackendApi.addSavedStock(currentUser.username, symbol);
      console.log({symbol}, "added");

      const savedStocks = await BackendApi.getSavedStocks(currentUser.username);
      console.log("All saved stocks:", savedStocks);
    } catch (err) {
        console.error("Failed to add stock. Please try again.", err);
    }
    console.log (stock.change_percentage);
  };

  return(
      <tr>
        <td><button onClick={handleAddButtonClick}>+</button>{stock.ticker}</td>
        <td>{stock.price}</td>
        <td>{stock.change_amount}</td>
        <td className={getColorClass(stock.change_percentage)}>{stock.change_percentage}</td>
        <td>{stock.volume}</td>
     </tr>
  )
};

export default StockBox;
