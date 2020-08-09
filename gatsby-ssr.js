import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script src="https://cdn.jsdelivr.net/npm/kursor"/>,
    <script dangerouslySetInnerHTML={{ __html: `new kursor({ type: 1, color: "#fff" });` }}/>
  ])
}
