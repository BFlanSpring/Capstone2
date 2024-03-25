Welcome to Codex Hangar, A React web based application to provide live stock data across all world financial markets.


# Codex Hangar

## SETUP: 
1. **Download**: Either pull these files from the git repo down to a new project folder or download the zip
2. **SetUp backend DB**: - start up PSQL: psql
                         - run: \i backend.sql (this will create and setup the backend db)
                         - In the backend directory run: npm install (install all dependencies for backend)

3. **SetUp frontend**: - In the frontend directory run: npm install (install all depencencies for frontend)

4. **Deploy Servers**: - run: npm start in the backend directory (will start backend server on  localhost port 3001)
                       - run: npm start in the frontend directory (will start frontend server on localhost port 3000)   

## Description
Codex Hangar is a React web application that provides various functionalities related to finance, job searching, and authenticated user profiles. Users can search for stocks, view top movers, most active, and top loosers across all global financial markets, save favorite stocks to a users watchlist, browse job listings, and manage user profiles.

## Features
1. **Stock Search**: Users can search for stocks by ticker symbol, name, or keywords, upon search execution, the user will be returned a list stocks best matching the users input, all ranked with different search weights.
2. **Top Movers**: Provides a list of top gainers, top losers, and most actively traded stocks in the market, along with the users saved stock watchlist with realtime updates.
3. **Saved Stock List**: Users can save their favorite stocks to their watchlist and view real-time data for these stocks, the backend keeps track of which stocks a certain user is interesed in and will be stored in the backend.
4. **Job Listings**: Displays fake job listings with details such as title, salary, company, and allows users to apply for jobs, which is also kept track of in the backend server based on the signed in user.
5. **User Authentication**: Supports user registration, login, and logout functionalities. The user authentication allows restrictions for individuals from accessing certain routes in the application.

## Testing
To run the tests: run :npm test

## User Flow
1. **Homepage**: Users land on the homepage displaying basic information about the application.
2. **Navigation**: Users can navigate to different sections using the navigation bar.
3. **Stock Search**: Users can search for stocks using the search form on the homepage or the dedicated search page.
4. **Job Listings**: Users can browse job listings under the "Jobs" section and apply for jobs if interested.
5. **Saved Stocks**: Logged-in users can access their saved stocks watchlist under the "Saved Stocks" section.

## API
The application utilizes the Alpha Vantage API for fetching stock data. The API key used is a limited key good up t 20 free requests and is [YOUR_API_KEY] in the frontend, but if you want to pay for more api requests, please visit https://www.alphavantage.co/ to purchase an unlimited access key. Ensure to replace it with your new Alpha Vantage API key to make more than the basic number of free requests.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js
- **APIs**: Alpha Vantage API which is an online free market API (https://www.alphavantage.co/) , Backend API which is a PSQL DB
- **State Management**: React Context API, useState, useEffect hooks
- **Routing**: React Router
- **Styling**: CSS

## Additional Notes
Thanks for checking out my web app! Feel free to checkout my linkedin https://www.linkedin.com/in/bradyflannery/ and message me with any sudgestions or to connect!
