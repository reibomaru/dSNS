import { useWeb3 } from "../../contexts/Web3Provider";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { Theme } from "../../../helpers/types";
import Select from "../../atoms/Select";
import Option from "../../atoms/Option";

const Header = () => {
  const { balance, account, currencyUnit } = useWeb3();
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();

  const navigateTo = useCallback(
    (to: string) => {
      return () => {
        navigate(to);
      };
    },
    [navigate]
  );

  const handleChangeTheme = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(
    (event) => {
      changeTheme(event.target.value as Theme);
    },
    [changeTheme]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <h1 onClick={navigateTo("/")} style={{ cursor: "pointer", margin: 20 }}>
          dSNS
        </h1>
        <div>
          <p>
            account{" "}
            <strong
              onClick={navigateTo(`/${account}`)}
              style={{ cursor: "pointer" }}
            >
              {account}
            </strong>
          </p>
          <p>
            balance: {balance} {currencyUnit}
          </p>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}>
        <p style={{ margin: 20 }}>
          Theme:
          <Select onChange={handleChangeTheme} value={theme}>
            <Option value="dark">dark</Option>
            <Option value="light">light</Option>
          </Select>
        </p>
      </div>
    </div>
  );
};

export default Header;
