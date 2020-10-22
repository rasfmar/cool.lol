import React from "react";
import { OutboundLink } from "react-ga";

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
      <OutboundLink
        eventLabel="marcusfranco"
        to="https://marcusfran.co"
      >
        Marcus Franco <span role="img" aria-label="a dude with sunglasses">😎</span>
      </OutboundLink>
    </div>
  );
};

export default General;
