import { useWeb3 } from "../../contexts/Web3Provider";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Header = () => {
  const { balance, account, currencyUnit } = useWeb3();
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (to: string) => {
      return () => {
        navigate(to);
      };
    },
    [navigate]
  );

  return (
    <>
      <h1 onClick={navigateTo("/")} style={{ cursor: "pointer" }}>
        dSNS
      </h1>
      <p>
        your account:{" "}
        <strong
          onClick={navigateTo(`/${account}`)}
          style={{ cursor: "pointer" }}
        >
          {account}
        </strong>
      </p>
      <p>
        your balance: {balance} {currencyUnit}
      </p>
      <hr />
    </>
  );
};

export default Header;
