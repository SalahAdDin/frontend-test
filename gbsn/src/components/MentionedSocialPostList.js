import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SocialPost from "./SocialPost";

function MentionedSocialPostList({ mentionedSocialPost }) {
  console.log(mentionedSocialPost);

  return (
    <div className="col col-12 col-lg-8">
      {/* <div className="mention-container">
        {mentionedSocialPost.map(post => (
          <SocialPost post={post} key={post.id} />
        ))}
      </div> */}
      <InfiniteScroll
        className="mention-container"
        dataLength={mentionedSocialPost.length}
        // next={queryAPI()}
        loader={
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        hasMore={true}
      >
        {mentionedSocialPost.map(post => (
          <SocialPost post={post} key={post.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default MentionedSocialPostList;
