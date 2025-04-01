"use client";
import Script from "next/script";
import React from "react";

const Chatling = () => {
  return (
    <Script
      id="chatling-embed-script"
      strategy="beforeInteractive"
      src={`https://chatling.ai/js/embed.js?data-id=${process.env.NEXT_PUBLIC_CHATLING_ID}`}
    />
    /*<script async data-id="6413424968" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>*/
  );
};
export default Chatling;