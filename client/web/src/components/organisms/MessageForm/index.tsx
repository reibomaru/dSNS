import { useCallback, useMemo, useState } from "react";
import { parseContent } from "../../../helpers/parseContent";
import { useWeb3 } from "../../contexts/Web3Provider";

const MessageForm = () => {
  const [contentInput, setContentInput] = useState<string>("");
  const preview = useMemo(() => {
    return parseContent(contentInput);
  }, [contentInput]);
  const { contract, account } = useWeb3();

  const changeContentInput = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >((event) => {
    setContentInput(event.target.value);
  }, []);

  const postMessage = useCallback(async () => {
    if (contentInput.length > 200) {
      alert("Sorry... the maximum content you can post is 200 characters.");
      return;
    }
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
        cols={80}
        rows={5}
        onChange={changeContentInput}
        value={contentInput}
      ></textarea>
      <span>{preview}</span>

      <p>
        {contentInput.length}/200 characters{" "}
        {contentInput.length > 200 && "over the limit!!"}
      </p>
      <div>
        <button onClick={postMessage}>post</button>
      </div>
    </>
  );
};

export default MessageForm;
