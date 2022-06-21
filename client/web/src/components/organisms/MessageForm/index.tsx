import { useCallback, useMemo, useState } from "react";
import { parseContent } from "../../../helpers/parseContent";
import Button from "../../atoms/Button";
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "50%",
          padding: 5,
        }}
      >
        <h2>Post</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: 120,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              margin: 2,
            }}
          >
            <strong>input</strong>
            <textarea
              name="content"
              id="content"
              onChange={changeContentInput}
              value={contentInput}
              style={{
                padding: 5,
                flex: 1,
                fontSize: 15,
                background: "inherit",
                color: "inherit",
              }}
              placeholder="Write what you want to tell everyone!"
            ></textarea>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              margin: 2,
            }}
          >
            <strong>preview</strong>
            <div
              style={{
                border: 1,
                borderStyle: "solid",
                padding: 5,
                flex: 1,
                fontSize: 15,
                overflowY: "scroll",
              }}
            >
              {preview}
              <hr />
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <>
                  {contentInput.length}/200 characters{" "}
                  {contentInput.length > 200 && "over the limit!!"}
                </>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button style={{ marginRight: "50%" }} onClick={postMessage}>
            post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
