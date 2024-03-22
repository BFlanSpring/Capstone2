import React from "react";
import gifImage from "../images/NotFound.gif"; 
import returnimg from "../images/Return.gif";
import "./NoDataPage.css";

function NoDataPage() {
  console.debug(NoDataPage);

  return (
    <a href="./" className="No-Data-container">
      <img id="no-data" src={gifImage} alt="No data GIF" />
      <a href="./" className="bottom-content">
        <p>Subscribe for more Stock Data requests</p>
        <img id="return" src={returnimg} alt="return home" />
    </a>
  </a>
  );
}

export default NoDataPage;



