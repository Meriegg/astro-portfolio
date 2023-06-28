import { GOOGLE_PRIVACY_POLICY } from "@src/config";
import { useEffect, useState } from "react";

export const GoogleAnalyticsAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const showLocalAlert = JSON.parse(localStorage.getItem("showAnalyticsAlert") || "true");

    setShowAlert(showLocalAlert);
  }, []);

  if (!showAlert) {
    return null;
  }

  return (
    <div
      className="fixed flex text-sm z-50 md:bottom-0 md:right-0 xsm:w-full md:rounded-br-none md:rounded-tr-none flex-col gap-2 text-center bottom-6 right-6 p-4 rounded-lg bg-white dark:bg-black border-2 border-neutral-100 dark:border-neutral-800 shadow-md"
      role="alertdialog"
      tabIndex={-1}
      aria-label="Google Analytics Disclosure"
      style={{
        width: "min(350px, 100%)",
      }}
    >
      <p className="font-semibold" aria-label="Google analytics disclosure text" role="contentinfo">
        Hello there, I must mention that this website uses Google Analytics.
        <a
          aria-label="See Google's Privacy Policy"
          role="link"
          href={GOOGLE_PRIVACY_POLICY}
          className="underline underline-offset-4"
          referrerPolicy="no-referrer"
        >
          {" "}
          See Google's Privacy Policy.
        </a>
      </p>
      <button
        aria-label="Agree with Google Analytics and confirm you read Google's Privacy Policy"
        role="button"
        onClick={() => {
          setShowAlert(false);
          localStorage.setItem("showAnalyticsAlert", "false");
        }}
        className="w-full py-2 rounded-lg transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
        OK Go away
      </button>
    </div>
  );
};
