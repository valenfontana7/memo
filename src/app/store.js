import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import tasksReducer from "./reducers/tasks_reducer";
import thunk from "redux-thunk";

const initialState = { };
const reducer = combineReducers({
  tasksList: tasksReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;