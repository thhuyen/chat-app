import { useEffect } from "react";
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import type { RootState } from "./store";
import AppLayout from "./components/AppLayout";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((s: RootState) => s.chat.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
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
