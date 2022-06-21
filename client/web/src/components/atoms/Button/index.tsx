import React from "react";

type props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
};

const Button = (props: props) => {
  return (
    <div
      style={{
        marginLeft: 10,
        background: "#fff",
        borderWidth: 2,
        padding: 2,
        borderRadius: 3,
        borderStyle: "solid",
        borderColor: "#000000",
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
