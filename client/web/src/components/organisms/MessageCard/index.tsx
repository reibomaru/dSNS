import { useMemo } from "react";
import { Message } from "../../../helpers/types";

type props = {
  message: Message;
};

const MessageCard = (props: props) => {
  const date = useMemo(() => {
    return new Date(props.message.createdAt * 1000).toUTCString();
  }, [props.message.createdAt]);

  return (
    <>
      <p>created at {date}</p>
      <p>created by {props.message.owner}</p>
      <p>{props.message.content}</p>
      <div>
        <button>like</button>
        {props.message.conutOfLikes}
      </div>
    </>
  );
};

export default MessageCard;
