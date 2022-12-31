import TerminalInput from "./TerminalInput";
import commandRunner from "./logic/commandRunner";
import { COMMAND_OUTPUTS } from "../../constants";
import { useRef, useEffect, useState, useCallback } from "react";

interface Props {
  setOpen: (val: boolean) => void;
}

const CLI = ({ setOpen }: Props) => {
  const [commandVal, setCommandVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([""]);
  const [commandHistoryIdx, setCommandHistoryIdx] = useState(0);
  const terminalRef = useRef<HTMLPreElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);

  const pushCommand = (output: string, plainOutput?: boolean) => {
    if (
      !terminalRef.current ||
      !inputRef.current ||
      !terminalContainerRef.current
    ) {
      return;
    }

    // Set the command history
    let tempCommandHistory = [...commandHistory];
    if (commandVal.trim()) {
      tempCommandHistory.push(commandVal);

      tempCommandHistory = [
        "",
        ...tempCommandHistory.slice(1, tempCommandHistory.length).reverse(),
      ];
      setCommandHistory(tempCommandHistory);
      tempCommandHistory = [];
    }

    if (commandVal === "exit") {
      setOpen(false);
      return;
    }

    // Run the command and get the output
    const commandOutput = commandRunner(commandVal);

    if (!plainOutput && commandVal !== "clear" && commandVal !== "cls") {
      // Clone the `input` node and attach it to the terminal output
      // Along with the command that was ran inside it
      const clonedInputRef = inputRef.current.cloneNode(true);
      terminalRef.current.appendChild(clonedInputRef);

      // Hide all the pulsing indicators from the previously cloned input
      // components
      // If this does not exist, there will be pulsing cursors `|` on the inputs
      // that are not focused and cannot be focused
      const invalidIndicators = document.querySelectorAll("#invalidIndicator");
      if (invalidIndicators) {
        invalidIndicators.forEach((elem) => {
          elem.classList.add("remove");
        });
      }
    }

    // Create the element that is going to display
    // the output for the command
    const elem = document.createElement("pre");
    elem.className = "font-fira";
    elem.innerHTML = plainOutput ? output : commandOutput;

    // Mount the element and automatically scroll to the bottom
    // of the container
    terminalRef.current.appendChild(elem);
    terminalContainerRef.current.scrollTop =
      terminalContainerRef.current.scrollHeight;
  };

  // Code for the History feature
  // Its pretty simple and pretty much explains itself
  // Just some event listeners and some callbacks
  const decreaseHistoryIdx = () => {
    setCommandHistoryIdx((prevIdx) => prevIdx - 1);
  };

  const increaseHistoryIdx = () => {
    setCommandHistoryIdx((prevIdx) => prevIdx + 1);
  };

  const commandHistoryEventCallback = useCallback((e: KeyboardEvent) => {
    const arrowUpCode = "ArrowUp";
    const arrowDownCode = "ArrowDown";

    switch (e.key) {
      case arrowUpCode:
        increaseHistoryIdx();
        break;

      case arrowDownCode:
        decreaseHistoryIdx();
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", commandHistoryEventCallback);

    return () =>
      window.removeEventListener("keydown", commandHistoryEventCallback);
  }, []);

  // When the command history index changes / The user presses
  // the UP key or the DOWN key on their keyboard
  // Set the value for the input to whatever value
  // That index holds
  useEffect(() => {
    if (commandHistoryIdx <= -1) {
      setCommandHistoryIdx(0);
    }

    if (commandHistoryIdx >= commandHistory.length) {
      setCommandHistoryIdx(commandHistory.length - 1);
    }

    setCommandVal(commandHistory[commandHistoryIdx]);
  }, [commandHistoryIdx]);

  // When the component first loads
  // Show the credentials command output
  useEffect(() => {
    pushCommand(COMMAND_OUTPUTS.credentials, true);
  }, []);

  return (
    <div
      className="max-h-[90vh] bg-dark-contrast flex flex-col overflow-hidden rounded-[20px]"
      style={{ width: "min(750px, 100%)" }}
    >
      <div className="w-full flex items-center justify-between border-b-[1px] border-b-opaque-gray pl-5">
        <p className="text-text-secondary font-semibold">
          root@mariodev.vercel.app
        </p>
        <button
          className="px-5 py-4 hover:bg-opaque-gray"
          onClick={() => setOpen(false)}
        >
          <img src="/icons/x-close-icon.svg" alt="" />
        </button>
      </div>
      <div
        ref={terminalContainerRef}
        className="h-auto bg-terminal-bg flex flex-col px-5 py-2 pb-3 overflow-y-auto custom-scrollbar cli-output"
      >
        <pre id="TERMINAL_CONTENT" ref={terminalRef}></pre>
        <TerminalInput
          inputRef={inputRef}
          pushCommand={pushCommand}
          setValue={setCommandVal}
          value={commandVal}
        />
      </div>
    </div>
  );
};

export default CLI;
