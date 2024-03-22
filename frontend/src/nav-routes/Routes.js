
import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import CompanyDetail from "../companies/CompanyDetail";
import HomePage from "../homepage/HomePage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import LogInForm from "../authentication/LoginForm";
import ProfileForm from "../authentication/ProfileForm";
import SignupForm from "../authentication/SignupForm";
import StockInfo from '../stocks/StockDetail';
import StockList from "../stocks/StockList";
import TopMovers from "../stocks/TopMovers";
import SavedStockList from "../stocks/SavedStockList";


function AppRoutes({ login, signup, authenticated, searchResults, fetchStocks}) { 
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );
 
    console.debug('Rendering AppRoutes');

    const ProtectedRoute = ({authenticated, children}) => {
      if (!authenticated) {
        return <Navigate to= "/" replace />
      }
      return children;
    };

    
    return (
      <Routes> 
        {/* unauthorized routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInForm login={login}/>} />
        <Route path="/signup" element={<SignupForm signup={signup}/>} />


        <Route path="/savedstocks" element={<SavedStockList />} />
        <Route path="/searchstocks" element={<StockList searchResults={searchResults} fetchStocks={fetchStocks} />} />
        <Route path="/stocks/:symbol" element={<StockInfo />} />
        <Route path="/topmovers" element={<TopMovers />} />

      
        {/* authorized routes */}
        <Route 
          path="/companies/:handle"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <CompanyDetail/>
            </ProtectedRoute>} />
        <Route 
          path="/companies" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <CompanyList/>
            </ProtectedRoute>} />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <JobList/>
            </ProtectedRoute>} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <ProfileForm/>
            </ProtectedRoute>} />
      </Routes>
    );
}

export default AppRoutes;
