import React from "react";
import { Helmet } from "react-helmet";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tilt from "react-tilt";

import "./main.css";
import thumbnail from "./thumbnail.png";
import meme from "./meme.png";
import _static from "./static.png";

export default function Home() {
  const words = [
    "that's", "oh", "ohh", "ohhh", "whoa", "woah",
    "hey", "yo", "yoo", "yooo", "really", "very",
    "super", "so", "soo", "sooo", "mega", "ultra",
    "dang", "too"
  ];
  const word = words[~~(Math.random() * words.length)];

  return (
    <>
      <Helmet>
        <meta name="keywords" content="cool,lol,cool.lol"/>
        <meta name="description" content="cool.lol is for when something is cool lol"/>

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

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156555564-2"/>,
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-156555564-2');`
        }}/>
      </Helmet>

      <div id="wrapper"></div>
      <div id="static"></div>

      <p id="title">{word} cool. lol</p>
      <Tilt
        className="Tilt"
        options={{
          reverse: true,
          glare: true,
          gyroscope: true,
          gyroscopeMinAngleX: -25,
          gyroscopeMaxAngleX: 25,
          gyroscopeMinAngleY: -25,
          gyroscopeMaxAngleY: 25,
          max: 25
        }}
      >
        <img className="Tilt-inner" src={meme} alt="a dude with sunglasses"/>
      </Tilt>
      <p id="footer">
        emails coming soon | <OutboundLink href="https://marcusfran.co/">Marcus Franco</OutboundLink>
        <span role="img" aria-label="a dude with sunglasses"> 😎</span>
      </p>
    </>
  );
}
