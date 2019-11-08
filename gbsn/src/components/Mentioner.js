import React from "react";

const Mentioner = ({ mentioner, index }) => {
  const { name, picture, length } = mentioner;

  return (
    <a
      href="#"
      className="no-style mentions-mentioner d-flex align-items-center"
    >
      <div className="mentions-mentioner-place">{index + 1}</div>
      <div
        className="prestigio-thumbnail mentions-mentioner-thumb mr-2"
        style={{ backgroundImage: `url(${picture})` }}
      ></div>
      <p className="small-text mb-0 ellipsis">{name}</p>
      <p className="small-text op-67 mb-0 ml-auto mr-1">{length}</p>
    </a>
  );
};

export default Mentioner;
