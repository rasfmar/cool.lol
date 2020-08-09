import React from "react"

export default function Home() {
  const words = ["that's", "oh", "ohh", "ohhh", "whoa", "woah", "hey", "yo", "yoo", "yooo", "really", "very", "super", "so", "soo", "sooo", "mega", "ultra", "dang", "too"];
  let word = words[~~(Math.random() * words.length)];

  return (
    <>
      <div id="wrapper"></div>
      <div id="static"></div>
      <p id="title">{word} cool. lol</p>
      <a id="footer" href="https://marcusfran.co/">😎 Marcus Franco</a>
    </>
  );
}
