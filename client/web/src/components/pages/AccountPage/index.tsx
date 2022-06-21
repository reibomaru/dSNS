import { useParams } from "react-router-dom";
import MessageCardList from "../../organisms/MessageCardList";

const AccountPage = () => {
  const { accountId } = useParams();
  return (
    <>
      <h2>Account ({accountId})</h2>
      <MessageCardList owner={accountId} />
      <hr />
    </>
  );
};

export default AccountPage;
