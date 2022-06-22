import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import likedIcon from "./thumb_up_filled.svg";
import likeIcon from "./thumb_up_outline.svg";
import likeIconDark from "./thumb_up_outline_dark.svg";

type props = {
  hasLiked: boolean;
  onClick: React.MouseEventHandler<HTMLImageElement>;
};

/**
 * Icon of likes component, the UI will vary depending on conditions.
 * @param props hasLiked
 * @returns Icon of likes component
 */
const LikeIcon = (props: props) => {
  const { theme } = useTheme();
  if (props.hasLiked) {
    return <img src={likedIcon} alt="liked" onClick={props.onClick} />;
  } else {
    return theme === "light" ? (
      <img src={likeIcon} alt="like" onClick={props.onClick} />
    ) : (
      <img src={likeIconDark} alt="like" onClick={props.onClick} />
    );
  }
};

export default React.memo(LikeIcon);
