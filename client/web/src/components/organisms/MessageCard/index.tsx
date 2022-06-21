import { useCallback, useMemo } from "react";
import { Message } from "../../../helpers/types";
import { useWeb3 } from "../../contexts/Web3Provider";
import { useNavigate } from "react-router-dom";
import { parseContent } from "../../../helpers/parseContent";

type props = {
  message: Message;
  hasLiked: boolean;
};

const MessageCard = (props: props) => {
  const { contract, account } = useWeb3();
  const date = useMemo(() => {
    return new Date(props.message.createdAt * 1000).toUTCString();
  }, [props.message.createdAt]);
  const navigate = useNavigate();
  const content = useMemo(() => {
    return parseContent(props.message.content);
  }, [props.message.content]);

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

  const navigateToOwnerPage = useCallback(() => {
    navigate(`/${props.message.owner}`);
  }, [navigate, props.message.owner]);

  return (
    <>
      <p>id: {props.message.id}</p>
      <p>created at {date}</p>
      <p>
        created by{" "}
        <strong onClick={navigateToOwnerPage} style={{ cursor: "pointer" }}>
          {props.message.owner}
        </strong>
      </p>
      <p>{content}</p>
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
