import { useWeb3 } from "../../contexts/Web3Provider";

const Header = () => {
  const { balance, account, currencyUnit } = useWeb3();

  return (
    <>
      <h1>dSNS</h1>
      <p>your account: {account}</p>
      <p>
        your balance: {balance} {currencyUnit}
      </p>
      <hr />
    </>
  );
};

export default Header;
