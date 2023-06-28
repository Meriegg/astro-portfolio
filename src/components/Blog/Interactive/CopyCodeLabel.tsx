import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

interface Props {
  label: string;
  code: string;
}

const CopyCodeLabel = ({ label, code }: Props) => {
  const [didCopyLabel, setDidCopyLabel] = useState(false);
  const [didCopyCode, setDidCopyCode] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <CopyToClipboard
        text={label}
        onCopy={() => {
          setDidCopyLabel(true);
          setTimeout(() => {
            setDidCopyLabel(false);
          }, 2500);
        }}
      >
        <button className="!text-xs tracking-tight text-white font-semibold px-2 py-1 hover:bg-neutral-800 rounded-sm">
          {didCopyLabel ? "Copied!" : "Copy Path"}
        </button>
      </CopyToClipboard>

      <CopyToClipboard
        text={code}
        onCopy={() => {
          setDidCopyCode(true);
          setTimeout(() => {
            setDidCopyCode(false);
          }, 2500);
        }}
      >
        <button className="!text-xs tracking-tight font-semibold text-white px-2 py-1 hover:bg-neutral-800 rounded-sm">
          {didCopyCode ? "Copied!" : "Copy Code"}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyCodeLabel;
