import React from 'react'
import SocialPost from './SocialPost'

function MentionedSocialPostList ({mentionedSocialPost}){
    return(
        <div className="col col-12 col-lg-8">
            <div className="mention-container">
                {
                    mentionedSocialPost.map(post=>(
                        <SocialPost
                        post={post}
                        key={post.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MentionedSocialPostList;
