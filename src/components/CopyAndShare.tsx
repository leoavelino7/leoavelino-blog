import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useSupportedNavigatorShare } from "../hooks/useSupportedNavigatorShare";
import { CopyIcon, FacebookIcon, InstagramIcon, TwitterIcon } from "../icons";
import { copyToClipboard } from "../lib/copyToClipboard";
import { share } from "../lib/share";

const iconCommonClassName = "w-5 h-5";

type Media = {
  title: string;
  Icon: JSX.Element;
};

const medias: Media[] = [
  {
    title: "Facebook",
    Icon: <FacebookIcon className={iconCommonClassName} />
  },
  {
    title: "Twitter",
    Icon: <TwitterIcon className={iconCommonClassName} />
  },
  {
    title: "Instagram",
    Icon: <InstagramIcon className={iconCommonClassName} />
  }
];

const BLOCKED_TIME = 2000;

type CopyAndShareProps = {
  text: string;
  shareData: ShareData;
};

export const CopyAndShare: FC<CopyAndShareProps> = ({ text, shareData }) => {
  const { t } = useTranslation();

  const supportedNavigatorShare = useSupportedNavigatorShare();
  const [copyButtonIsDisabled, setCopyButtonIsDisabled] = useState(false);

  const sharePost = () => {
    share(shareData);
  };

  const copy = () => {
    setCopyButtonIsDisabled(true);
    copyToClipboard(text);
    toast.success(t("copied_link"), {
      theme: "light",
      position: "bottom-center",
      autoClose: BLOCKED_TIME,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    });
  };

  useEffect(() => {
    if (copyButtonIsDisabled) {
      const timer = setTimeout(() => {
        setCopyButtonIsDisabled(false);
      }, BLOCKED_TIME);

      return () => clearTimeout(timer);
    }
  }, [copyButtonIsDisabled]);

  return (
    <Fragment>
      <ul className="flex flex-row justify-center gap-2 text-primary pb-36">
        <li className="flex flex-row justify-center">
          <button
            className="flex flex-row justify-center items-center gap-x-2 py-1 px-5 border border-solid border-primary rounded-md hover:bg-primary hover:text-paper focus:brightness-75 disabled:cursor-not-allowed disabled:bg-primary disabled:text-paper disabled:brightness-50"
            onClick={copy}
            disabled={copyButtonIsDisabled}
          >
            <CopyIcon className={iconCommonClassName} /> {t("copy_link")}
          </button>
        </li>
        {supportedNavigatorShare &&
          medias.map((media) => (
            <li key={media.title} className="flex flex-row justify-center">
              <button
                className="p-2 border border-solid border-primary rounded-md hover:bg-primary hover:text-paper focus:outline-none focus:brightness-75"
                onClick={sharePost}
              >
                {media.Icon}
              </button>
            </li>
          ))}
      </ul>
      <ToastContainer />
    </Fragment>
  );
};
