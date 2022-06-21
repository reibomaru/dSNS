import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Theme } from "../../../helpers/types";

type themeContext = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  themeStyles: {
    color: string;
    background: string;
  };
};

const ThemeContext = createContext<themeContext>({
  theme: "light",
  changeTheme: () => {
    console.error("Sorry... you cannot change the theme yet");
  },
  themeStyles: {
    color: "#000000",
    background: "#ffffff",
  },
});

type props = {
  children: React.ReactNode;
};

const ThemeProvider = (props: props) => {
  const [theme, setTheme] = useState<Theme>("light");
  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme);
  }, []);
  const themeStyles = useMemo(() => {
    if (theme === "light") {
      return {
        color: "#000000",
        background: "#ffffff",
      };
    } else {
      return {
        color: "#D6D5A8",
        background: "#0F0E0E",
      };
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeStyles }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          overflowY: "scroll",
          background: themeStyles.background,
          color: themeStyles.color,
        }}
      >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => {
  return useContext(ThemeContext);
};
