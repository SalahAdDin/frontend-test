import React from 'react'
import TaggedBrand from './TaggedBrand'

function TaggedBrandList ({mentions}) {
    console.log('====================================');
    console.log(mentions);
    console.log('====================================');
    return(
        <div className="mb-2">
            {
                mentions.map(brand=>(
                    <TaggedBrand
                    brand={brand}
                    key={brand._id}/>
                ))
            }
        </div>
    )    
};

export default TaggedBrandList;