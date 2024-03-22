import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackendApi from "../api/BackendApi";
import JobCardList from "../jobs/JobCardList";


function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await BackendApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return null;

  return (
      <div className="CompanyDetail">
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        <JobCardList jobs={company.jobs} />
      </div>
  );
}

export default CompanyDetail;
