import React from "react";

type props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
};

/**
 * Button with a specific style applied
 * @param props onClick, style
 * @returns button JSX Element
 */
const Button = (props: props) => {
  return (
    <div
      style={{
        marginLeft: 10,
        borderWidth: 2,
        padding: 2,
        borderRadius: 3,
        borderStyle: "solid",
        cursor: "pointer",
        fontWeight: 500,
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default React.memo(Button);
