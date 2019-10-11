import React, { useState } from 'react'
import Error from './Error';

function SearchBox({saveQuery}) {
     const [searchedTerm, saveSearchedTerm] = useState('');
     // Handle select field
     const [error, saveError] = useState(false);

     const searchPost = e => {
         e.preventDefault();

         // Validate
         // TODO: It does not work
         if (searchedTerm === ''){
             saveError(true);
             return;
         }

         // Validate term to main component
         saveError(false);
         saveQuery(searchedTerm);
     }
    return(
        <form onSubmit={searchPost} className="prestigio-responsive-central-pane">
            <div className="form-row pr-close-row">
                <div className="form-group col col-12 col-md-4 mb-2 mb-md-3">
                    <select 
                    className="form-control prestigio-new-input w-100 pr-select"
                    >
                        <option>Date</option>
                        <option>Name</option>
                    </select>
                </div>
                <div className="form-group col col-12 col-md-auto ml-auto mb-3">
                      <div className="prestigio-search">
                        <input type="search" 
                        className="form-control prestigio-new-input w-100" 
                        placeholder="Search..."
                        onChange={ e => saveSearchedTerm(e.target.value) }
                        />
                        <button type="button" className="form-control prestigio-search-input-btn"><i className="pr-icon-search"></i></button>
                      </div>
                    </div>
            </div>
            { (error) ? <Error message="Use a valid term to search!"/> : null}
        </form>
    );
}

export default SearchBox;