import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SocialPost from "./SocialPost";

function MentionedSocialPostList({
  mentionedSocialPost,
  currentPage,
  saveCurrentPage,
  totalPost
}) {

  return (
    <div className="col col-12 col-lg-8">
      <InfiniteScroll
        className="mention-container"
        style={{ overflow: "inherit" }}
        dataLength={mentionedSocialPost.length}
        next={e => saveCurrentPage(currentPage + 1)}
        loader={
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        hasMore={totalPost > mentionedSocialPost.length}
      >
        {mentionedSocialPost.map(post => (
          <SocialPost post={post} key={post.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default MentionedSocialPostList;
