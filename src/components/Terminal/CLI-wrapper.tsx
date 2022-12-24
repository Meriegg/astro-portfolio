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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
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
