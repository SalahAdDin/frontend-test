import React, {useState} from "react";

function FilterBox({saveMentionedSocialPost}) {
  const [option, saveOption] = useState('all');

  const filterList = e => {
    e.preventDefault();
    saveMentionedSocialPost(m => m.filter(post=>post.social===option));
    // TODO: get the initial list in order to filter from 0 and not with the final array
  }

  return (
    <form onSubmit={filterList} className="prestigio-responsive-central-pane">
      <div className="row pr-close-row">
        <div className="col col-auto mb-3">
          <button onClick={e => saveOption('all')}
            type="submit"
            className="prestigio-btn prestigio-blue-white-inverse metrics-picker selected prestigio-shadow"
          >
            ALL
          </button>
        </div>
        <div className="col col-auto mb-3">
          <button onClick={e=>saveOption('facebook')}
            type="submit"
            className="prestigio-btn square metrics-picker prestigio-shadow facebook"
          >
            <i className="pr-icon-facebook"></i>
          </button>
        </div>
        <div className="col col-auto mb-3">
          <button onClick={e => saveOption('instagram')}
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
