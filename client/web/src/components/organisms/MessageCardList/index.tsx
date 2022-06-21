import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3 } from "../../contexts/Web3Provider";
import MessageCard from "../MessageCard";
import { Message, SortMode } from "../../../helpers/types";

type props = {
  owner?: string;
};

const MessageCardList = (props: props) => {
  const { contract, account, web3 } = useWeb3();
  const [messages, setMessages] = useState<Message[]>([]);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("");

  const updateFeed = useCallback(async () => {
    const _messages: Message[] = await contract.methods
      .listMessages(web3.utils.fromAscii(sortMode))
      .call();
    if (props.owner) {
      setMessages(
        _messages.filter((_message) => _message.owner === props.owner)
      );
    } else {
      setMessages(_messages);
    }

    const likedIds = await contract.methods.likedMessageIdOf().call({
      from: account,
    });
    setLikedIds(likedIds);
  }, [account, contract.methods, sortMode, web3.utils, props.owner]);

  useEffect(() => {
    (async () => {
      await updateFeed();
    })();
  }, [updateFeed]);

  const changeSortMode = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((event) => {
    setSortMode(event.target.value as SortMode);
  }, []);

  const cardList = useMemo(() => {
    return messages.map((message) => {
      const hasLiked = likedIds.includes(message.id);
      return (
        <MessageCard message={message} key={message.id} hasLiked={hasLiked} />
      );
    });
  }, [likedIds, messages]);

  return (
    <>
      <div>
        {"sort by "}
        <select onChange={changeSortMode} value={sortMode}>
          <option value="createdAt">createdAt</option>
          <option value="countOfLikes">conutOfLikes</option>
          <option value="">id</option>
        </select>
        <button onClick={updateFeed}>update feed</button>
      </div>

      {cardList}
    </>
  );
};

export default MessageCardList;
