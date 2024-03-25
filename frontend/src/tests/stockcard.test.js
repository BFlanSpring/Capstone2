import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StockCard from '../stocks/StockCard';
import UserContext from "../authentication/UserContext"; // Import UserContext

// Mock UserContext
const mockUserContext = {
  handleAddStock: jest.fn(),
};

describe('StockCard component', () => {
  it('renders stock information and button', () => {
    // Render StockCard component with mock props and context
    render(
      <Router>
        <UserContext.Provider value={mockUserContext}>
          <StockCard symbol="AAPL" name="Apple Inc" type="Equity" region="United States" />
        </UserContext.Provider>
      </Router>
    );

    // Assert that stock information is rendered
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Name: Apple Inc')).toBeInTheDocument();
    expect(screen.getByText('Type: Equity')).toBeInTheDocument();
    expect(screen.getByText('Region: United States')).toBeInTheDocument();

    // Assert that the "Add to Saved Stocks" button is rendered
    expect(screen.getByRole('button', { name: 'Add to Saved Stocks' })).toBeInTheDocument();
  });

  it('calls handleAddStock function when "Add to Saved Stocks" button is clicked', () => {
    // Render StockCard component with mock props and context
    render(
      <Router>
        <UserContext.Provider value={mockUserContext}>
          <StockCard symbol="AAPL" name="Apple Inc" type="Equity" region="United States" />
        </UserContext.Provider>
      </Router>
    );

    // Simulate click on "Add to Saved Stocks" button
    fireEvent.click(screen.getByRole('button', { name: 'Add to Saved Stocks' }));

    // Assert that handleAddStock function is called with the correct symbol
    expect(mockUserContext.handleAddStock).toHaveBeenCalledWith('AAPL');
  });
});
