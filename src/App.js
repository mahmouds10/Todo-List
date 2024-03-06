import React from "react";
import Header from "./Components/Header/Header";
import style from "./App.module.css";
import Controls from "./Components/Controls/Controls";
import AppContent from "./Components/AppContent/AppContent";
import { Provider } from "react-redux";
import { myStore } from "./Store/store";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Provider store={myStore}>
      <div className="container">
        <Header />
        <div className={style.appWrapper}>
          <Controls />
          <AppContent />
        </div>
      </div>
      <Toaster containerStyle={{ fontSize: "1.5rem" }} />
    </Provider>
  );
}

export default App;
