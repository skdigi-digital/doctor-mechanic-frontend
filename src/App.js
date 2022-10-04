import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./containers/auth/login";

// REDUX IMPORTS
import { Provider } from "react-redux";
import configureStore from "./store";
// import Dashboard from "./containers/dashboard";
import Sidebar from "./containers/sidebar";

import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

function App(props) {
  // console.log(props);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {window.location.pathname === "/" ? (
            <Route exact path="/" component={Login} />
          ) : (
            <Sidebar />
          )}
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
