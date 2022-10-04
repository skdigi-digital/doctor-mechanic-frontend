import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import rootSaga from "./saga";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
