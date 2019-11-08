import React from "react";
import Mentioner from "./Mentioner";

function TopMentionersList({ topMentioners }) {
  return (
    <div className="col col-lg-4 d-none d-lg-block">
      <div className="mentions-right-column">
        <div className="prestigio-pane mb-3 prestigio-shadow">
          <h4 className="px-2 pt-2">Top mentioners</h4>
          <div className="mentions-mentioner-group">
            {topMentioners.slice(0, 5).map((mentioner, index) => (
              <Mentioner
                mentioner={mentioner}
                index={index}
                key={mentioner.key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMentionersList;
