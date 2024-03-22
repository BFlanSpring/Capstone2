import React, { useState, useEffect } from "react";
import Search from "../general/SearchForm";
import BackendApi from "../api/BackendApi";
import JobCardList from "./JobCardList";
import "./JobCard.css";



function JobList() {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);

  useEffect(function getAllJobsOnMount() {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  }, []);

  async function search(title) {
    let jobs = await BackendApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return null;

  return (
      <div className="JobList">
        <Search searchFor={search} />
        {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default JobList;

