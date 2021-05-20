import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  currencyDetailsbyUserReducer,
  currencyDetailsReducer,
  currencyListReducer,
  currencyRegisterReducer,
  currencySellReducer,
  sendMailReducer,
} from "./reducers/currencyReducers";
import {
  addUserReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

const middleware = [thunk];

const userInfoFromStorage = null;
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const reducer = combineReducers({
  currencyList: currencyListReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  currencyDetails: currencyDetailsReducer,
  user: userDetailsReducer || addUserReducer,
  userWallet:currencyDetailsbyUserReducer,
  currencyBuy: currencyRegisterReducer,
  currencySell: currencySellReducer,
  send:sendMailReducer
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
