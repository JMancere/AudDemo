import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
 import sessionReducer from "./session";
// import spotsReducer from "./spots";
import audiogramsReducer from "./audiograms";
import devicesReducer from "./devices";
const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  audiograms: audiogramsReducer,
  devices: devicesReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
