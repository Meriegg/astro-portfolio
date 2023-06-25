import React, { MutableRefObject, useRef } from "react";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pushCommand: (val: string) => void;
  inputRef: MutableRefObject<HTMLDivElement | null>;
}

const TerminalInput = ({ value, setValue, pushCommand, inputRef }: Props) => {
  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const inputElementContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex" tabIndex={-1} ref={inputRef}>
      <span>
        <span className="text-terminal-green">root@mariodev.vercel.app</span>
        <span className="text-white">:</span>
        <span className="text-terminal-blue">~/home</span>
        <span className="mt-1 text-white">$</span>
      </span>
      <div className="relative w-full" ref={inputElementContainerRef}>
        <input
          type="text"
          value={value}
          ref={inputElementRef}
          className="focus:outline-none text-white border-none bg-transparent ml-1 flex-grow w-full relative z-20"
          onChange={(e) => setValue(() => e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter" || e.keyCode === 13) {
              pushCommand(value);
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default TerminalInput;
