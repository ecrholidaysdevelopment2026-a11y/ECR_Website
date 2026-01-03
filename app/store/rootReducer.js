import { combineReducers } from "redux";
import villaReducer from "./slice/villaSlice";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import popupReducer from "./slice/popupSlice";
import locationReducer from "./slice/locationSlice";
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  villas: villaReducer,
  popup: popupReducer,
  location: locationReducer,
});
export default reducer;
