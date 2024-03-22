import React, { useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./general/UseLocalStorage";
import NavBar from "./nav-routes/NavBar";
import AppRoutes from "./nav-routes/Routes";
import BackendApi from "./api/BackendApi";
import AlphaAPI from "./api/AlphaAPI";
import UserContext from "./authentication/UserContext";
import { jwtDecode } from "jwt-decode";
export const TOKEN_STORAGE_ID = "backend-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [searchResults, setSearchResults] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );


  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          BackendApi.token = token;
          let currentUser = await BackendApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

 
  async function signup(signupData) {
    try {
      let token = await BackendApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await BackendApi.login(loginData);
      setToken(token);

      let { username } = jwtDecode(token);
      let currentUser = await BackendApi.getCurrentUser(username);

      setCurrentUser(currentUser);
      console.log("Logged in as:", currentUser);
      console.log(token);

      
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    BackendApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  const authenticated = !!token; 

  if (authenticated) {
    console.log(true);
  }



/* ---------------------------- Stock functions ------------------------------------*/





// useEffect(() => {
//   fetchStocks(); // Initial fetch on component mount
// }, []);


async function fetchStocks(query = '', apiKey) {
  try {
      const response = await AlphaAPI.searchEndpoint(query, apiKey);
      setSearchResults(response.bestMatches || []);
      console.log('Response from AlphaAPI:', response); // Log the API response
  } catch (error) {
      console.error('Error fetching stock data:', error);
  }
}

  function removeSavedStock(stock) {
    setSavedStocks((prevSavedStocks) =>
      prevSavedStocks.filter((savedStock) => savedStock !== stock)
    );
  }


  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ hasAppliedToJob, applyToJob, currentUser, setCurrentUser, removeSavedStock, savedStocks }}>
          <div className="App">
            <NavBar logout={logout} />
            <AppRoutes login={login} 
                        signup={signup} 
                        authenticated={authenticated} 
                        searchResults={searchResults} 
                        fetchStocks={fetchStocks}/>
                        {/* fetchStockData={fetchStockData} */}
          </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
