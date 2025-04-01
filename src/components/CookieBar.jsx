"use client"

import { useState, useEffect } from "react";

const CookieBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesAccepted="));
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie = "cookiesAccepted=true; max-age=31536000; path=/";
    setIsVisible(false);
  };

  const handleReject = () => {
    document.cookie = "cookiesAccepted=false; max-age=31536000; path=/"; // 1 year
    // Optionally, clear other cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    });
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setIsCustomizeOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
    {!isCustomizeOpen ? 
    <div className="fixed shadow-2xl left-2.5 md:left-5 bottom-2.5 md:bottom-5 z-[9999] w-[95%] bg-white flex flex-col gap-4 justify-between p-4 md:p-6 text-black max-w-lg">
      <div>
        <h2>We value your privacy</h2>
        <p className="text-sm text-[#565656] mt-1">
          Please note that we use cookies on this website which enable you to
          use this website and its functionalities. These cookies are strictly
          necessary if you want to use the website and a specific functionality.
          To learn more about our cookies, how we use them and their benefits,
          read our Cookie Policy.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 w-full">
      <button
      onClick={handleCustomize}
          className="w-auto border border-[#d1ee00] bg-white text-black hover:text-[#666] py-2 md:py-2.5 px-4 md:px-6 rounded-md transition font-medium text-[13px] md:text-[15px]"
        >
          Customize
        </button>
        <button
        onClick={handleReject}
          className="w-auto border border-[#d1ee00] bg-white text-black hover:text-[#666] py-2 md:py-2.5 px-4 md:px-6 rounded-md transition font-medium text-[13px] md:text-[15px]"
        >
          Reject All
        </button>
        <button onClick={handleAccept}
          className="w-auto bg-[#d1ee00] hover:bg-[#c6e104] border border-[#d1ee00] text-black py-2 md:py-2.5 px-4 md:px-6 rounded-md transition font-medium text-[13px] md:text-[15px]"
        >
          Accept Cookies
        </button>
      </div>
    </div> : (
        <div className="fixed shadow-2xl left-2.5 md:left-5 bottom-2.5 md:bottom-5 z-[9999] w-[95%] bg-white flex flex-col gap-4 justify-between p-4 md:p-6 text-black max-w-lg">
            <h2>Customize Cookies</h2>
            <p className="text-sm text-[#565656] mt-1">
              Select which types of cookies you allow. Essential cookies cannot be disabled.
            </p>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked disabled className="mr-2" />
              Essential Cookies (Always Enabled)
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Analytics Cookies
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Marketing Cookies
            </label>
            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="border border-gray-400 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  document.cookie = "cookiesAccepted=custom; max-age=31536000; path=/";
                  setIsCustomizeOpen(false);
                  setIsVisible(false);
                }}
                className="bg-[#d1ee00] hover:bg-[#c6e104] px-4 py-2 rounded-md text-black"
              >
                Save Preferences
              </button>
            </div>
        </div>
      )}
    </>
  );
};

export default CookieBar;
