import React from "react";

const General = ({ children }) => {
  return (
    <div className="App">
      <div className="wrapper"></div>
      <div className="static"></div>
      <div className="content">
        <h1>cool.lol</h1>
        <h4>shorten any url</h4>
        {children}
      </div>
    </div>
  );
};

export default General;
