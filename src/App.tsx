import { store } from "./store";
import { Provider } from "react-redux";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
