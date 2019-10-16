import React from 'react';

function FilterBox(){
    return(
        <form className="prestigio-responsive-central-pane">
								<div className="row pr-close-row">
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn prestigio-blue-white-inverse metrics-picker selected prestigio-shadow">ALL</button>
									</div>
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn square metrics-picker prestigio-shadow facebook"><i className="pr-icon-facebook"></i></button>
									</div>
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn square metrics-picker prestigio-shadow instagram"><i className="pr-icon-instagram"></i></button>
									</div>
								</div>
        </form>
    );
}

export default FilterBox;

