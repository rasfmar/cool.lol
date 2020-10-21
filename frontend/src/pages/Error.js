import React from "react";
import { Link } from "react-router-dom";
import General from "./General";
import Head from "../components/Head";

const Error = ({ location }) => {
  return (
    <>
      <Head />
      <General>
        <p>not found: {location.pathname}</p>
        <Link to="/">back home</Link>
      </General>
    </>
  );
};

export default Error;
