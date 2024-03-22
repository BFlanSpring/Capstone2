import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css"




function CompanyCard({ name, description, logoUrl, handle }) {
  console.debug("CompanyCard", logoUrl);

  return (
      <Link className="CompanyCard-card" to={`/companies/${handle}`}>
        <div className="card-body">
          <h6 className="card-title">{name}</h6>
          <p className="description">{description}</p>
        </div>
      </Link>
  );
}

export default CompanyCard;
