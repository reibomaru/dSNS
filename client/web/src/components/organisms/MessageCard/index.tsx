import React, { useCallback, useMemo } from "react";
import { Message } from "../../../helpers/types";
import { useWeb3 } from "../../contexts/Web3Provider";
import { useNavigate } from "react-router-dom";
import { parseContent } from "../../../helpers/parseContent";
import { truncate } from "./helper";
import LikeIcon from "../../atoms/LikeIcon";

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
  // Parse content string and create appropriate jsx element
  const content = useMemo(() => {
    return parseContent(props.message.content);
  }, [props.message.content]);

  // call likeMessage from contract
  const likeMessage = useCallback(async () => {
    await contract.methods.likeMessage(props.message.id).send(
      {
        from: account,
      },
      (error: any) => {
        if (error) {
          console.error(error);
        }
      }
    );
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
        <LikeIcon hasLiked={props.hasLiked} onClick={likeMessage} />
        <span style={{ marginLeft: 5 }}>{props.message.conutOfLikes}</span>
      </div>
    </div>
  );
};

export default React.memo(MessageCard);
