import MessageForm from "../../organisms/MessageForm";
import MessageCardList from "../../organisms/MessageCardList";

const TopPage = () => {
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
      <h2>Top</h2>
      <hr />
      <MessageForm />
      <MessageCardList />
    </div>
  );
};

export default TopPage;
