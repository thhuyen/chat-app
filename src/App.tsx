import { useEffect } from "react";
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import type { RootState } from "./store";
import { ConfigProvider, theme as antTheme } from "antd";
import AppLayout from "./components/AppLayout";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((s: RootState) => s.chat.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#25D366",
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
