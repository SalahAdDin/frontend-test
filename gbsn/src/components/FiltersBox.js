import React from "react";

function FilterBox({ saveOption }) {
  const sendOption = (e, type) => {
    e.preventDefault();
    saveOption(type);
  };

  return (
    <form className="prestigio-responsive-central-pane">
      <div className="row pr-close-row">
        <div className="col col-auto mb-3">
          <button
            onClick={e => {
              sendOption(e, "all");
            }}
            type="submit"
            className="prestigio-btn prestigio-blue-white-inverse metrics-picker selected prestigio-shadow"
          >
            ALL
          </button>
        </div>
        <div className="col col-auto mb-3">
          <button
            onClick={e => {
              sendOption(e, "facebook");
            }}
            type="submit"
            className="prestigio-btn square metrics-picker prestigio-shadow facebook"
          >
            <i className="pr-icon-facebook"></i>
          </button>
        </div>
        <div className="col col-auto mb-3">
          <button
            onClick={e => {
              sendOption(e, "instagram");
            }}
            type="submit"
            className="prestigio-btn square metrics-picker prestigio-shadow instagram"
          >
            <i className="pr-icon-instagram"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FilterBox;

// const MentionedSocialPost = MentionedSocialPost.filter(post=>post.social === {option})
