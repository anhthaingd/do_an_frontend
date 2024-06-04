import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@goongmaps/goong-js/dist/goong-js.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux";
import { AuthContextProvider } from "./context/AuthContext";
const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PersistGate>
  </Provider>
);
