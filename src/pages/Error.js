import React from "react";
import { Link } from "react-router-dom";
import General from "./General";

const Error = ({ location }) => {
  return (
    <General>
      <p>not found: {location.pathname}</p>
      <Link to="/">back home</Link>
    </General>
  );
};

export default Error;
