import React from 'react'
import TaggedBrand from './TaggedBrand'

function TaggedBrandList ({mentions}) {
    console.log('====================================');
    console.log(mentions);
    console.log('====================================');
    const brand_number=mentions.length;
    return(
        <div className="mb-2">
            {
                mentions.slice(0,2).map(brand=>(
                    <TaggedBrand
                    brand={brand}
                    key={brand._id}/>
                ))
            }
            {
                brand_number > 2 &&
                <div className="profile-timeline-tag mr-0 mb-0 d-flex align-items-center prestigio-shadow" data-toggle="modal" data-target="#moreTagsModal">
                    <div className="prestigio-thumbnail mr-2" style={{background: '#eee'}}>
                        <div className="thumbnail-number">+{brand_number-2}</div>
                    </div>
                    <p className="mb-0 small-text ellipsis">+{brand_number-2} more tags</p>
                </div>
            }
        </div>
    )    
};

export default TaggedBrandList;