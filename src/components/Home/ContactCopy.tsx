import shortenLink from "../../utils/shortenLink";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

interface Props {
  copyText: string;
  opaqueText?: string;
  displayText: string;
  visitLink?: string;
  label: string;
}

const ContactCopy = ({
  copyText,
  displayText,
  opaqueText = "",
  visitLink,
  label,
}: Props) => {
  const [didCopy, setDidCopy] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold tracking-normal text-text-secondary m-0">
        {label}
      </p>
      <div className="overflow-hidden rounded-[5px] flex flex-wrap w-fit">
        <p
          className="px-[20px] py-[10px] bg-green-accent text-dark-contrast font-semibold flex-grow break-all"
          dangerouslySetInnerHTML={{
            __html: `${shortenLink(displayText).replace(
              opaqueText,
              `<span class="opacity-80 text-dark-contrast">${opaqueText}</span>`
            )}`,
          }}
        ></p>
        <div className="flex flex-wrap flex-grow">
          <CopyToClipboard
            text={copyText}
            onCopy={() => {
              setDidCopy(true);
              setTimeout(() => {
                setDidCopy(false);
              }, 2500);
            }}
          >
            <button className="px-[20px] py-[10px] font-semibold bg-dark-contrast hover:bg-hover-contrast flex-grow">
              {didCopy ? "Copied!" : "Copy"}
            </button>
          </CopyToClipboard>
          {visitLink ? (
            <div className="flex flex-grow gap-0">
              <div className="h-full w-[1px] bg-opaque-gray"></div>
              <a href={visitLink} className="w-full">
                <button className="w-full px-[20px] py-[10px] font-semibold bg-dark-contrast hover:bg-hover-contrast flex-grow">
                  visit
                </button>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContactCopy;
