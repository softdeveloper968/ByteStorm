"use client";
import React from "react";

const GoogleTag = () => (
  <>
    <script
      id="GA-before-hydration"
      strategy="beforeInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
    />
    {/* Load Google Analytics after hydration */}
    <script
      id="GA-after-hydration"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}');
          `,
      }}
    />
  </>
);
export default GoogleTag;
