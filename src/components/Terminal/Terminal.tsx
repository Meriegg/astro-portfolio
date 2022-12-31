import OpenTerminal from "./OpenTerminal";
import CLIWrapper from "./CLI-wrapper";
import { useEffect, useState } from "react";

const Terminal = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // If the user presses `Ctrl + X` open the terminal
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "x") {
      setIsTerminalOpen(!isTerminalOpen);
    }
  };

  // Mount the event listener and clean it up after every re-render
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <OpenTerminal isOpen={isTerminalOpen} setOpen={setIsTerminalOpen} />
      <CLIWrapper setOpen={setIsTerminalOpen} isOpen={isTerminalOpen} />
    </div>
  );
};

export default Terminal;
