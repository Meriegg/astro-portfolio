import OpenTerminal from "./OpenTerminal";
import CLIWrapper from "./CLI-wrapper";
import { useState } from "react";

const Terminal = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div>
      <OpenTerminal isOpen={isTerminalOpen} setOpen={setIsTerminalOpen} />
      <CLIWrapper setOpen={setIsTerminalOpen} isOpen={isTerminalOpen} />
    </div>
  );
};

export default Terminal;
