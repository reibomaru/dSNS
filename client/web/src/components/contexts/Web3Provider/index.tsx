import React from "react";

type props = {
  children: React.ReactNode;
};

const Web3Provider = (props: props) => {
  return <>{props.children}</>;
};

export default React.memo(Web3Provider);
