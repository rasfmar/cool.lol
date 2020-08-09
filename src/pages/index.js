import React from "react";
import { Helmet } from "react-helmet";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import {
  Engine,
  RenderClones,
  Walls,
  Circle
} from "react-matter-js";
import Tilt from "react-tilt";
import { css } from "@emotion/core";

import "./main.css";
import thumbnail from "./thumbnail.png";
import meme from "./meme.png";
import _static from "./static.png";

export default function Home() {
  const width = 300+52;
  const height = (typeof window !== "undefined" ? window.innerHeight : "600") + 52;
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
      </Helmet>

      <div id="wrapper"></div>
      <div id="static"></div>
      <div id="physics">
        <Engine options={{}}>
          <RenderClones
            enableMouse
            options={{
              width,
              height,
              background: "transparent",
              wireframes: true,
              wireframeBackground: "transparent"
            }}
          >
            <Walls
              x={0}
              y={0}
              width={width}
              height={height}
              wallWidth={25}
            />
            <Circle
              clone
              x={100}
              y={100}
              radius={30}
              options={{
                restitution: .99
              }}
            />
            <Circle
              clone
              x={100}
              y={100}
              radius={40}
              options={{
                restitution: .99
              }}
            />
            <Circle
              clone
              x={100}
              y={100}
              radius={50}
              options={{
                restitution: .99
              }}
            />
          </RenderClones>
        </Engine>
      </div>

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
