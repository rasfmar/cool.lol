import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="https://cdn.jsdelivr.net/npm/kursor"/>,
    <script dangerouslySetInnerHTML={{ __html: `new kursor({ type: 1, color: "#fff" });` }}/>,
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156555564-2"/>,
    <script dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-156555564-2');`
    }}/>
  ])
}
