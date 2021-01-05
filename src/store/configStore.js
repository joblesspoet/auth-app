import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

const persistConfig = {
  key: "root:DEVICELOG",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export default () => {
  let store = createStoreWithMiddleware(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
