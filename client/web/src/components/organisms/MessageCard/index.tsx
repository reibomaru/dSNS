import { useCallback, useMemo } from "react";
import { Message } from "../../../helpers/types";
import { useWeb3 } from "../../contexts/Web3Provider";
import { useNavigate } from "react-router-dom";
import { parseContent } from "../../../helpers/parseContent";
import likedIcon from "./thumb_up_filled.svg";
import likeIcon from "./thumb_up_outline.svg";
import { truncate } from "./helper";

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
    <div
      style={{
        border: 1,
        borderStyle: "solid",
        padding: 5,
        margin: "10px 0px",
      }}
    >
      <p>
        <strong onClick={navigateToOwnerPage} style={{ cursor: "pointer" }}>
          {truncate(props.message.owner, 8, 4)}
        </strong>
      </p>
      <p>{content}</p>
      <div
        style={{ display: "flex", flexDirection: "row-reverse", opacity: 0.5 }}
      >
        created at {date}
      </div>
      <div style={{ cursor: "pointer", alignItems: "center", display: "flex" }}>
        {props.hasLiked ? (
          <img src={likedIcon} alt="liked" onClick={likeMessage} />
        ) : (
          <img src={likeIcon} alt="like" onClick={likeMessage} />
        )}
        <span style={{ marginLeft: 5 }}>{props.message.conutOfLikes}</span>
      </div>
    </div>
  );
};

export default MessageCard;
