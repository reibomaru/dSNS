import { useParams } from "react-router-dom";
import MessageCardList from "../../organisms/MessageCardList";

const AccountPage = () => {
  const { accountId } = useParams();
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h2 style={{ width: "50%" }}>{accountId}'s page</h2>
      </div>
      <MessageCardList owner={accountId} />
      <hr />
    </div>
  );
};

export default AccountPage;
