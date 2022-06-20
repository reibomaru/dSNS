import { useEffect, useState } from "react";
import { useWeb3 } from "../../contexts/Web3Provider";
import MessageCard from "../MessageCard";
import { Message } from "../../../helpers/types";

const MessageCardList = () => {
  const { contract, account } = useWeb3();
  const [messages, setMessages] = useState<Message[]>([]);
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const _messages = await contract.methods.listMessages().call();
      setMessages(_messages);
    })();
  }, [contract.methods, contract.methods.listMessages]);

  useEffect(() => {
    (async () => {
      const likedIds = await contract.methods.likedMessageIdOf().call({
        from: account,
      });
      setLikedIds(likedIds);
    })();
  }, [account, contract.methods]);
  return (
    <>
      {messages.map((message) => {
        const hasLiked = likedIds.includes(message.id);
        return (
          <MessageCard message={message} key={message.id} hasLiked={hasLiked} />
        );
      })}
    </>
  );
};

export default MessageCardList;
