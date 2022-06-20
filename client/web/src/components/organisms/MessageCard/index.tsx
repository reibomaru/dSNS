import { useCallback, useMemo } from "react";
import { Message } from "../../../helpers/types";
import { useWeb3 } from "../../contexts/Web3Provider";

type props = {
  message: Message;
  hasLiked: boolean;
};

const MessageCard = (props: props) => {
  const { contract, account } = useWeb3();
  const date = useMemo(() => {
    return new Date(props.message.createdAt * 1000).toUTCString();
  }, [props.message.createdAt]);

  const likeMessage = useCallback(async () => {
    const res = await contract.methods.likeMessage(props.message.id).send(
      {
        from: account,
      },
      (error: any, _hash: any) => {
        if (error) {
          console.log(error);
        }
      }
    );
    console.log(res);
  }, [account, contract.methods, props.message.id]);

  return (
    <>
      <p>id: {props.message.id}</p>
      <p>created at {date}</p>
      <p>created by {props.message.owner}</p>
      <p>{props.message.content}</p>
      <div>
        <button onClick={likeMessage}>
          {props.hasLiked ? "unlike" : "like"}
        </button>
        {props.message.conutOfLikes}
      </div>
    </>
  );
};

export default MessageCard;
