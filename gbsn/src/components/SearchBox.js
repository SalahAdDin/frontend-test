import React, { useState } from "react";
import Error from "./Error";

function SearchBox({ saveQuery, saveOrderField }) {
  const [searchedTerm, saveSearchedTerm] = useState("");
  // Handle select field
  const [error, saveError] = useState(false);

  const searchPost = e => {
    e.preventDefault();

    // Validate
    if (searchedTerm === "") {
      saveError(true);
      return;
    }

    // Validate term to main component
    saveError(false);
    saveQuery(searchedTerm);
  };

  const requestData = e => {
    if (e.key === "Enter") {
      saveQuery(searchedTerm);
    }
  };

  return (
    <form onSubmit={searchPost} className="prestigio-responsive-central-pane">
      <div className="form-row pr-close-row">
        <div className="form-group col col-12 col-md-4 mb-2 mb-md-3">
          <select 
          onKeyDown={e => requestData(e.target.value)}
          onChange={e => saveOrderField(e.target.value)}
          className="form-control prestigio-new-input w-100 pr-select">
            <option value="post_created_at">Date</option>
            <option value="usersid">Name</option>
          </select>
        </div>
        <div className="form-group col col-12 col-md-auto ml-auto mb-3">
          <div className="prestigio-search">
            <input
              type="search"
              className="form-control prestigio-new-input w-100"
              placeholder="Search..."
              onKeyDown={e => requestData(e.target.value)}
              onChange={e => saveSearchedTerm(e.target.value)}
            />
            {/* TODO: review this, is it duplicated? */}
            <button
              type="button"
              className="form-control prestigio-search-input-btn"
            >
              <i className="pr-icon-search"></i>
            </button>
          </div>
        </div>
      </div>
      {error ? <Error message="Use a valid term to search!" /> : null}
    </form>
  );
}

export default SearchBox;
