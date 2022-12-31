import { clsx } from "clsx";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  setValue: (e: string) => void;
  pushCommand: (val: string) => void;
  inputRef: MutableRefObject<HTMLDivElement | null>;
}

const TerminalInput = ({ value, setValue, pushCommand, inputRef }: Props) => {
  const [isFocused, setFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const valueContainerRef = useRef<HTMLPreElement | null>(null);
  const inputIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const inputElementContainerRef = useRef<HTMLDivElement | null>(null);

  const styleInputValue = (value: string) => {
    if (!value) return "";

    const splitInput = value.split(" ");
    const inputVal = splitInput[0];

    splitInput[0] = `<span class="${
      inputVal === "exit" ? `text-terminal-red` : `text-terminal-yellow`
    } font-bold tracking-tight">${inputVal}</span>`;

    return splitInput.join(" ");
  };

  useEffect(() => {
    if (!inputIndicatorRef.current || !valueContainerRef.current) {
      return;
    }

    inputIndicatorRef.current.classList.remove("remove");

    const valueContainerRects =
      valueContainerRef.current.getBoundingClientRect();
    inputIndicatorRef.current.style.left = `${valueContainerRects.width}px`;

    setIsAnimating(false);
    const resetTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 750);

    return () => {
      clearTimeout(resetTimeout);
    };
  }, [value]);

  useEffect(() => {
    if (!inputElementRef.current) return;

    inputElementRef.current.focus();
  }, []);

  return (
    <div className="flex" ref={inputRef}>
      <span>
        <span className="text-terminal-green">root@mariodev.vercel.app</span>
        <span>:</span>
        <span className="text-terminal-blue">~/home</span>
        <span className="mt-1">$</span>
      </span>
      <div className="relative w-full" ref={inputElementContainerRef}>
        <input
          type="text"
          value={value}
          ref={inputElementRef}
          className="focus:outline-none border-none bg-transparent ml-1 flex-grow w-full opacity-0 relative z-20"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(key) => {
            if (key.code.toLowerCase() === "enter" || key.keyCode === 13) {
              if (inputIndicatorRef.current) {
                inputIndicatorRef.current.id = "invalidIndicator";
              }

              pushCommand(value);
              setValue("");
            }
          }}
        />
        <pre
          ref={valueContainerRef}
          className="absolute top-0 left-0 h-full z-10 text-white ml-1 w-fit"
          dangerouslySetInnerHTML={{
            __html: styleInputValue(value),
          }}
        ></pre>
        {isFocused ? (
          <span
            ref={inputIndicatorRef}
            className={clsx(
              "transition-all duration-300 absolute w-0.5 h-full top-0 ml-1 bg-white",
              isAnimating && "animate-fullPulse"
            )}
          ></span>
        ) : null}
      </div>
    </div>
  );
};

export default TerminalInput;
