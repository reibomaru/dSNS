import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3 } from "../../contexts/Web3Provider";
import MessageCard from "../MessageCard";
import { Message, SortMode } from "../../../helpers/types";
import Button from "../../atoms/Button";
import Select from "../../atoms/Select";
import Option from "../../atoms/Option";

type props = {
  owner?: string;
};

/**
 * component of list of messages
 * @param props owner: if the owner is set up, list only he or her messages
 * @returns component of list of messages
 */
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

  // Fetch data on first load.
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
      // check if the account has liked the message
      const hasLiked = likedIds.includes(message.id);
      return (
        <MessageCard message={message} key={message.id} hasLiked={hasLiked} />
      );
    });
  }, [likedIds, messages]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "50%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h2>Feed</h2>
          <Button onClick={updateFeed}>update feed</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div>
            {"sort by "}
            <Select onChange={changeSortMode} value={sortMode}>
              <Option value="createdAt">created at</Option>
              <Option value="countOfLikes">likes</Option>
              <Option value="">message id</Option>
            </Select>
          </div>
        </div>

        {cardList}
      </div>
    </div>
  );
};

export default React.memo(MessageCardList);
