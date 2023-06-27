import CopyToClipboard from "react-copy-to-clipboard";
import { getLastPathOfURL } from "../../../utils/getLastPathOfURL";
import { useState } from "react";
import { AccentButton } from "./Buttons";

interface Props {
  url: string | undefined;
}

const ShareArticleFooter = ({ url }: Props) => {
  const [didCopy, setDidCopy] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Thank you for reading!</h1>
        <p>If you found this article useful please share it so we can help other people!</p>
      </div>

      {url ? (
        <CopyToClipboard
          text={`https://mariodev.vercel.app/blog/post/${getLastPathOfURL(url)?.replace(
            /.mdx/g,
            ""
          )}`}
          onCopy={() => {
            setDidCopy(true);
            setTimeout(() => {
              setDidCopy(false);
            }, 3000);
          }}
        >
          <AccentButton>{didCopy ? "Link copied!" : "Share!"}</AccentButton>
        </CopyToClipboard>
      ) : (
        <p>There was a problem loading the link for this page!</p>
      )}
    </div>
  );
};

export default ShareArticleFooter;
