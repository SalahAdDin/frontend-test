import React from "react";

const Error = ({ message }) => (
  <div className="alert alert-danger mx-auto text-center" role="alert">
    <h4 className="alert-heading">Error!</h4>
    <p>{message}</p>
  </div>
);

export default Error;
