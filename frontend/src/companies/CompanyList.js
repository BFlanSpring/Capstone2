import React, { useState, useEffect } from "react";
import SearchForm from "../general/SearchForm";
import BackendApi from "../api/BackendApi";
import CompanyCard from "./CompanyCard";
import "./CompanyCard.css";


function CompanyList() {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    search();
  }, []);

  async function search(name) {
    let companies = await BackendApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return null;

  return (
      <div className="CompanyList">
        <SearchForm searchFor={search} />
        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default CompanyList;
