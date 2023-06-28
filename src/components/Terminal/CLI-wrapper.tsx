import CLI from "./CLI";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const CLIWrapper = ({ isOpen, setOpen }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  // This makes sure that the react portal will be rendered on the client
  // and will not cause any errors
  // You cannot render React portals on the server
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if the Component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          aria-hidden={!isOpen}
          role="alert"
          className={clsx(
            "transition duration-300 fixed top-0 left-0 w-full h-full bg-terminal-bg px-4 flex justify-center items-center",
            isOpen ? "opacity-100 z-30" : "opacity-0 -z-30"
          )}
        >
          <CLI setOpen={setOpen} />
        </div>,
        document.querySelector("#CLI_PORTAL") as HTMLElement
      )}
    </>
  );
};

export default CLIWrapper;
