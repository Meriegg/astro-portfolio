import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const BaseBtnStyles =
  "transition-all duration-200 w-fit px-7 py-3 rounded-full text-sm font-semibold flex justify-center gap-2 items-center";

export const AccentButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${BaseBtnStyles} bg-green-accent hover:bg-green-500 text-main-bg ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};

export const GhostButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${BaseBtnStyles} bg-dark-contrast hover:bg-opaque-gray text-text-primary ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};
