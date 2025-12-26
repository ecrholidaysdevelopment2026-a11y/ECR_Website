import { combineReducers } from "redux";
import villaReducer from "./slice/villaSlice";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  villas: villaReducer,
});
export default reducer;
