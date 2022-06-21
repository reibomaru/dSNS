import React from "react";

type props = {
  children: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string | number | readonly string[];
};

const Select = (props: props) => {
  return (
    <select
      onChange={props.onChange}
      value={props.value}
      style={{ fontWeight: 600, background: "inherit", color: "inherit" }}
    >
      {props.children}
    </select>
  );
};

export default React.memo(Select);
