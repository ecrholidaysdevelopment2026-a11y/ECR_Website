import { combineReducers } from "redux";
import villaReducer from "./slice/villaSlice";
const reducer = combineReducers({
  villas: villaReducer,
});
export default reducer;
