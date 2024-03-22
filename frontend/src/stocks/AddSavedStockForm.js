import React, { useState, useContext } from "react";
import BackendApi from "../api/BackendApi";
import UserContext from "../authentication/UserContext";

const AddSavedStockForm = () => {
  const { currentUser } = useContext(UserContext); // Access currentUser from the context
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await BackendApi.addSavedStock(currentUser.username, symbol);
      setSuccess(true);
      setSymbol("");

      // Fetch all saved stocks after adding a new stock
      const savedStocks = await BackendApi.getSavedStocks(currentUser.username);
      console.log("All saved stocks:", savedStocks);
    } catch (err) {
      setError("Failed to add stock. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Stock</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">Stock added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="symbol" className="form-label">
            Symbol
          </label>
          <input
            type="text"
            className="form-control"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddSavedStockForm;
