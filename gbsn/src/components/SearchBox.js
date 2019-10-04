import React, { useState } from 'react'

function Searcher(params) {
     const [searchedTerm, saveSearchedTerm] = useState('');
     const [error, saveError] = useState(false);

     const searchPost = e => {
         e.preventDefault();

         // Validate
         if (searchedTerm === ''){
             saveError(true);
             return;
         }

         // Validate term to main component
         saveError(true);
     }
    return(
        <form onSubmit={searchPost} className="prestigio-responsive-central-pane">
            <div className="form-row pr-close-row">
                <div className="form-group col col-12 col-md-4 mb-2 mb-md-3">
                    <select className="form-control prestigio-new-input w-100 pr-select">
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
        </form>
    );
}

export default Searcher;