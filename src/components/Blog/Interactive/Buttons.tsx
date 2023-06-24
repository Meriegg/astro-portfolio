import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const BaseBtnStyles =
  "transition-all duration-200 w-fit px-7 py-3 rounded-full text-sm font-semibold flex justify-center gap-2 items-center";

export const AccentButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${BaseBtnStyles} dark:bg-green-accent bg-lightMode-green-accent hover:bg-green-500 text-main-bg ${
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
      className={`${BaseBtnStyles} dark:bg-dark-contrast bg-lightMode-dark-contrast hover:dark:bg-opaque-gray hover:bg-lightMode-opaque-gray dark:text-text-primary text-lightMode-text-primary ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};
