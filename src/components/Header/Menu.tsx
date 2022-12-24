import OpenMenuBtn from "./OpenMenuBtn";
import MenuLink from "./MenuLink";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { useState, useEffect } from "react";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden sm:block">
      <OpenMenuBtn isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
      {isMounted
        ? createPortal(
            <div
              className={clsx(
                "transform transition duration-300 fixed top-0 left-0 w-full h-full bg-black",
                isMenuOpen
                  ? "translate-x-0 z-10 opacity-100"
                  : "-translate-x-6 -z-10 opacity-0"
              )}
            >
              <div className="h-full flex flex-col gap-6 justify-center px-6">
                <MenuLink href="/" text="Home" />
                <MenuLink href="/blog" text="My Blog" />
              </div>
            </div>,
            document.getElementById("MENU_PORTAL") as HTMLElement
          )
        : null}
    </div>
  );
};

export default Menu;
