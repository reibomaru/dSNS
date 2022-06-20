import { useCallback, useState } from "react";
import { useWeb3 } from "../../contexts/Web3Provider";

const MessageForm = () => {
  const [contentInput, setContentInput] = useState<string>("");
  const { contract, account } = useWeb3();

  const changeContentInput = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >((event) => {
    setContentInput(event.target.value);
  }, []);

  const postMessage = useCallback(async () => {
    await contract.methods.createMessage(contentInput).send({
      from: account,
    });
  }, [account, contentInput, contract.methods]);

  return (
    <>
      <p>post message</p>
      <textarea
        name="content"
        id="content"
        cols={100}
        rows={5}
        onChange={changeContentInput}
        value={contentInput}
      ></textarea>
      <div>
        <button onClick={postMessage}>post</button>
      </div>
    </>
  );
};

export default MessageForm;
