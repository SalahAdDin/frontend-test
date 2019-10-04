import React from 'react';
import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="App brand-prestigio">
      <div className="container-fluid prestigio-brand-background">
        <div className="row pr-close-row">
          <div className="col col-lg-6 offset-lg-3">
            <div className="row no-gutters">
              <div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">               
                <SearchBox/>
                <div className="prestigio-responsive-central-pane"></div>
                {/* <div className="prestigio-tab-pane" style="display: block;" id="brand-pane" data-tabs="mentions"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
