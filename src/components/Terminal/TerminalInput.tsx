import { clsx } from "clsx";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pushCommand: (val: string) => void;
  inputRef: MutableRefObject<HTMLDivElement | null>;
}

const TerminalInput = ({ value, setValue, pushCommand, inputRef }: Props) => {
  let maxLetters = 0;

  const [isFocused, setFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const valueContainerRef = useRef<HTMLPreElement | null>(null);
  const inputIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const inputElementContainerRef = useRef<HTMLDivElement | null>(null);

  const [inputIndicatorActiveIdx, setInputIndicatorActiveIndex] = useState(0);

  type ParsedInputKey = {
    keyIdx: number;
    letters: string[];
    val: string;
  };

  const styleInputValue = (keys: ParsedInputKey[]) => {
    let finalHTML = "";

    let letterIdxTrack = 0;
    keys.forEach((key) => {
      key.letters.map((letter) => {
        finalHTML += `<span data-letter-idx=${letterIdxTrack} class="font-semibold tracking-tight ${
          key.keyIdx === 0
            ? key.val === "exit"
              ? "text-terminal-red"
              : "text-terminal-yellow"
            : "text-white"
        }">${letter}</span>`;
        letterIdxTrack += 1;
      });
    });

    maxLetters = letterIdxTrack;

    return finalHTML;
  };

  const decreaseIndicatorIdx = (ctrlKey: boolean) => {
    if (inputIndicatorActiveIdx <= 0) {
      setInputIndicatorActiveIndex(0);
      return;
    }

    if (ctrlKey) {
      const activeLetters = document.querySelectorAll(`[data-letter-idx]`);
      const currentLetter = activeLetters[inputIndicatorActiveIdx - 1];

      for (
        let i = parseInt(currentLetter.getAttribute("data-letter-idx") || "0") - 1;
        i >= 0;
        i--
      ) {
        const letter = activeLetters[i];

        if (i === 0) {
          setInputIndicatorActiveIndex(i);
          break;
        }

        if (!letter?.textContent?.trim()) {
          setInputIndicatorActiveIndex(i + 1);
          break;
        }
      }

      return;
    }

    setInputIndicatorActiveIndex((prev) => prev - 1);
  };

  const increaseIndicatorIdx = (ctrlKey: boolean) => {
    if (inputIndicatorActiveIdx >= maxLetters) {
      setInputIndicatorActiveIndex(maxLetters);
      return;
    }

    if (ctrlKey) {
      const activeLetters = document.querySelectorAll(`[data-letter-idx]`);
      const currentLetter = activeLetters[inputIndicatorActiveIdx - 1];

      for (
        let i = parseInt(currentLetter?.getAttribute("data-letter-idx") || "0") + 1;
        i < activeLetters.length;
        i++
      ) {
        const letter = activeLetters[i];
        console.log(letter);

        if (i === activeLetters.length - 1) {
          setInputIndicatorActiveIndex(i + 1);
          break;
        }

        if (!letter?.textContent?.trim()) {
          setInputIndicatorActiveIndex(i + 1);
          break;
        }
      }

      return;
    }

    setInputIndicatorActiveIndex((prev) => prev + 1);
  };

  const parseInputValueToTags = (value: string) => {
    if (!value) return;
    const parseRegex = /(\s+)/;
    const splitKeys = value.split(parseRegex);

    let keys: ParsedInputKey[] = [];

    splitKeys.forEach((key, idx) => {
      keys.push({
        keyIdx: idx,
        letters: key.split(""),
        val: key,
      });
    });

    const inputHTML = styleInputValue(keys);

    return inputHTML;
  };

  useEffect(() => {
    if (!inputIndicatorRef.current || !valueContainerRef.current) {
      return;
    }

    const activeLetter = document.querySelector(`[data-letter-idx="${inputIndicatorActiveIdx}"]`);
    const activeLetterRects = activeLetter?.getBoundingClientRect();

    inputIndicatorRef.current.classList.remove("remove");

    const diff = maxLetters - inputIndicatorActiveIdx;

    const valueContainerRects = valueContainerRef.current.getBoundingClientRect();
    inputIndicatorRef.current.style.left = `${
      valueContainerRects.width - (activeLetterRects?.width || 0) * diff
    }px`;

    console.log("activeIdx ", inputIndicatorActiveIdx);
    console.log("maxLetters ", maxLetters);

    setIsAnimating(false);
    const resetTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 750);

    return () => {
      clearTimeout(resetTimeout);
    };
  }, [inputIndicatorActiveIdx, isFocused]);

  useEffect(() => {
    if (!inputElementRef.current) return;

    inputElementRef.current.focus();
  }, []);

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
          className="focus:outline-none border-none bg-transparent ml-1 flex-grow w-full opacity-0 relative z-20"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            let prevVal = e.target.value;
            setValue(() => e.target.value);

            const prevValLen = prevVal.length;
            const valLen = value.length;
            maxLetters = prevValLen;

            if (prevValLen > valLen) {
              increaseIndicatorIdx(false);
            }
          }}
          onKeyDown={(key) => {
            const isBackSpace = key.code.toLowerCase() === "backspace" || key.keyCode === 8;
            const isArrowLeft = key.code.toLowerCase() === "arrowleft" || key.keyCode === 37;
            const isArrowRight = key.code.toLowerCase() === "arrowright" || key.keyCode === 39;
            const isEnter = key.code.toLowerCase() === "enter" || key.keyCode === 13;

            if (isBackSpace) {
              decreaseIndicatorIdx(key.ctrlKey);
              return;
            }

            if (isEnter) {
              if (inputIndicatorRef.current) {
                inputIndicatorRef.current.id = "invalidIndicator";
                inputIndicatorRef.current.style.left = "0px";
              }

              pushCommand(value);
              setValue("");
            }

            if (isArrowLeft) {
              decreaseIndicatorIdx(key.ctrlKey);
              return;
            }

            if (isArrowRight) {
              increaseIndicatorIdx(key.ctrlKey);
              return;
            }
          }}
        />
        <pre
          ref={valueContainerRef}
          className="absolute top-0 left-0 h-full z-10 text-white ml-1 w-fit"
          dangerouslySetInnerHTML={{
            __html: parseInputValueToTags(value) || "",
          }}
        />
        {isFocused ? (
          <span
            ref={inputIndicatorRef}
            className={clsx(
              "transition-all duration-300 absolute border-[1px] border-white h-full top-0 ml-1",
              isAnimating && "animate-fullPulse"
            )}
          ></span>
        ) : null}
      </div>
    </div>
  );
};

export default TerminalInput;
