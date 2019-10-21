import React from "react";
import ReactHashtag from "react-hashtag";
import TaggedBrandList from "./TaggedBrandList";

const SocialPost = ({ post }) => {

  const {
    facebook,
    instagram,
    mentions,
    post_content,
    post_created_at,
    post_metrics,
    social
  } = post;
  const { name, url, picture } =
    facebook.length > 0 ? facebook[0].accountinfo : instagram[0].accountinfo;
  const { engagement, reach } =
    facebook.length > 0
      ? facebook[0].accountmetrics
      : instagram[0].accountmetrics;
  const socialClass = `ptp-h-sn ${social}`;
  const post_date = new Date(Date.parse(post_created_at));

  return (
    <div className="mention-row">
      <div className="mention-body">
        <div className="row pr-close-row">
          <div className="col col-12 col-md-7 mb-2">
            <a
              href=""
              className="no-style"
              rel="noopener noreferrer"
              target="_blank"
            >
              {/* TODO: post url is required */}
              <div className="profile-timeline-post pb-2 mb-0 prestigio-shadow">
                <div className="ptp-header mb-2 d-flex justify-content-between relative">
                  <div className="ptp-header-left d-flex">
                    <div
                      className="prestigio-thumbnail"
                      style={{ backgroundImage: `url(${picture})` }}
                    ></div>
                    <div className="ptp-header-left-text ml-2 d-flex flex-column justify-content-between">
                      <div className="ptp-header-name">{name}</div>
                      <div className="ptp-header-info">
                        <span className={socialClass}>{social}</span>
                        <span className="ptp-h-sep"> . </span>
                        <span className="ptp-h-date">
                          {post_date.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false
                          })}
                        </span>
                        <span className="ptp-h-sep"> . </span>
                        <span className="ptp-h-prv">
                          <i className="pr-icon-world"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ptp-content mb-2">
                  <div className="ptp-c-text">
                    <p className="mb-0">
                      {/* TODO: Get the hashtag url*/}
                      <ReactHashtag
                        renderHashtag={hashtagValue => (
                          <object type="prestigio/link">
                            <a href="/influencer/hashtag-results.html">
                              {hashtagValue}
                            </a>
                          </object>
                        )}
                      >
                        {post_content.text}
                      </ReactHashtag>
                    </p>
                  </div>
                  <div className="ptp-c-thumb">
                    <img src={post_content.picture} alt="" />
                  </div>
                </div>
                <div className="ptp-footer d-flex">
                  <div className="ptp-f-container d-flex align-items-center">
                    <div className="ptp-f-icon">
                      <i className="pr-icon-like"></i>
                    </div>
                    <div className="ptp-f-text">{post_metrics.likes_count}</div>
                  </div>
                  <div className="ptp-f-container d-flex align-items-center">
                    <div className="ptp-f-icon">
                      <i className="pr-icon-comment"></i>
                    </div>
                    <div className="ptp-f-text">
                      {post_metrics.comments_count}
                    </div>
                  </div>
                  <div className="ptp-f-container d-flex align-items-center">
                    <div className="ptp-f-icon">
                      <i className="pr-icon-share"></i>
                    </div>
                    <div className="ptp-f-text">
                      {post_metrics.shares_count}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col col-12 col-md-5">
            <div className="prestigio-pane px-3 pt-3 mb-3 prestigio-shadow d-flex flex-column justify-content-center">
              <a href={url} className="no-style d-none d-md-block">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="prestigio-thumbnail mr-2"
                    style={{ backgroundImage: `url(${picture})` }}
                  ></div>
                  <p className="small-text mb-0 ellipsis">{name}</p>
                </div>
              </a>
              <div className="small-title-span p-0 mb-1">
                <span>POST METRICS</span>
              </div>
              <div className="row pr-close-row">
                <div className="col mb-3">
                  <span className="small-text op-67">
                    <strong>Reach</strong>
                  </span>
                  <h3 className="mb-0">{reach}</h3>
                </div>
                <div className="col mb-3">
                  <span className="small-text op-67">
                    <strong>Engagement</strong>
                  </span>
                  <h3 className="mb-0">{engagement}</h3>
                </div>
              </div>
              <div className="small-title-span p-0 mb-2">
                <span>TAGGED BRANDS</span>
              </div>
              <TaggedBrandList mentions={mentions} />
            </div>
            <div className="text-right">
              <button
                type="button"
                className="prestigio-btn prestigio-blue-white prestigio-shadow"
                data-toggle="modal"
                data-target="#shareModal"
                onClick={() => (window.location.href = url)}
              >
                <i className="pr-icon-share"></i> SHARE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row pr-close-row">
        <div className="col col-8 offset-2 offset-lg-3">
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SocialPost;
