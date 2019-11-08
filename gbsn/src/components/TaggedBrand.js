import React from "react";

const TaggedBrand = ({ brand }) => {
  const { brand_logo_url, brand_name } = brand.brand[0];
  // brand_url is required

  return (
    <a href="" className="no-style">
      <div className="profile-timeline-tag mr-0 d-flex align-items-center prestigio-shadow">
        <div
          className="prestigio-thumbnail mr-2"
          style={{ backgroundImage: `url(${brand_logo_url})` }}
        ></div>
        <p className="mb-0 small-text ellipsis">{brand_name}</p>
      </div>
    </a>
  );
};

export default TaggedBrand;
