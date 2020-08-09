import React from "react"
import { Helmet } from "react-helmet"

import "./main.css";
import thumbnail from "./thumbnail.png";
import meme from "./meme.png";
import _static from "./static.png";

export default function Home() {
  const words = ["that's", "oh", "ohh", "ohhh", "whoa", "woah", "hey", "yo", "yoo", "yooo", "really", "very", "super", "so", "soo", "sooo", "mega", "ultra", "dang", "too"];
  let word = words[~~(Math.random() * words.length)];

  return (
    <>
      <Helmet>
        <meta name="keywords" content="cool,lol,cool.lol"/>
        <meta name="description" content="Page description. No longer than 155 characters." />

        <meta name="twitter:card" content="cool lol"/>
        <meta name="twitter:site" content="@rasfmar"/>
        <meta name="twitter:title" content="cool.lol"/>
        <meta name="twitter:description" content="cool lol"/>
        <meta name="twitter:creator" content="@rasfmar"/>
        <meta name="twitter:image" content={thumbnail}/>

        <meta property="og:title" content="cool.lol"/>
        <meta property="og:url" content="https://cool.lol"/>
        <meta property="og:image" content={thumbnail}/>
        <meta property="og:description" content="cool lol"/>
        <meta property="og:site_name" content="cool.lol" />

        <link rel="icon" type="image/png" href={meme}/>
        <link rel="preload" as="image" href={_static}/>

        <title>cool.lol</title>
      </Helmet>
      <div id="wrapper"></div>
      <div id="static"></div>
      <p id="title">{word} cool. lol</p>
      <a id="footer" href="https://marcusfran.co/"><span role="img" aria-label="a dude with sunglasses">😎</span> Marcus Franco</a>
    </>
  );
}
