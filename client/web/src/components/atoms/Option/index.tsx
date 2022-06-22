import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";

type props = {
  children: React.ReactNode;
  value: string | number | readonly string[];
};

/**
 * Option with a specific style applied
 * @param props value
 * @returns option JSX Element
 */
const Option = (props: props) => {
  const { themeStyles } = useTheme();
  return (
    <option
      value={props.value}
      style={{ color: themeStyles.color, background: themeStyles.background }}
    >
      {props.children}
    </option>
  );
};

export default React.memo(Option);
