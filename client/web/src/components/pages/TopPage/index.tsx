import MessageForm from "../../organisms/MessageForm";
import MessageCardList from "../../organisms/MessageCardList";

const TopPage = () => {
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
      <MessageForm />
      <hr style={{ width: "50%" }} />
      <MessageCardList />
    </div>
  );
};

export default TopPage;
