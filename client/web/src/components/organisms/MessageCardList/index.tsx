import { useEffect, useState } from "react";
import { useWeb3 } from "../../contexts/Web3Provider";
import MessageCard from "../MessageCard";
import { Message } from "../../../helpers/types";

const MessageCardList = () => {
  const { contract } = useWeb3();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    (async () => {
      const _messages = await contract.methods.listMessages().call();
      setMessages(_messages);
    })();
  }, [contract.methods, contract.methods.listMessages]);
  return (
    <>
      {messages.map((message) => {
        return <MessageCard message={message} key={message.id} />;
      })}
    </>
  );
};

export default MessageCardList;
