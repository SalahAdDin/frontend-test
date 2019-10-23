import React from "react";
import Mentioner from "./Mentioner";

function TopMentionersList({ topMentioners }) {
  return (
    <div class="col col-lg-4 d-none d-lg-block">
      <div class="mentions-right-column">
        <div class="prestigio-pane mb-3 prestigio-shadow">
          <h4 class="px-2 pt-2">Top mentioners</h4>
          <div class="mentions-mentioner-group">{
              topMentioners.map(mentioner=>(
                  <Mentioner />
              ))
          }</div>
        </div>
      </div>
    </div>
  );
}

export default TopMentionersList;
