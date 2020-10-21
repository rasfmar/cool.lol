import React from "react";
import Helmet from "react-helmet";
import thumbnail from "../assets/thumbnail.png";

const Head = () => (
  <Helmet>
    <meta name="keywords" content="cool,lol,cool.lol"/>
    <meta name="description" content="a free url shortener"/>
    <meta name="twitter:card" content="cool lol"/>
    <meta name="twitter:site" content="@rasfmar"/>
    <meta name="twitter:title" content="cool.lol"/>
    <meta name="twitter:description" content="a free url shortener"/>
    <meta name="twitter:creator" content="@rasfmar"/>
    <meta name="twitter:image" content={thumbnail}/>
    <meta property="og:title" content="cool.lol"/>
    <meta property="og:url" content="https://cool.lol"/>
    <meta property="og:image" content={thumbnail}/>
    <meta property="og:description" content="a free url shortener"/>
    <meta property="og:site_name" content="cool.lol"/>
  </Helmet>
);

export default Head;
