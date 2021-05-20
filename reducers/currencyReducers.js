import {
  CURRENCY_DETAILS_BY_USER_FAIL,
  CURRENCY_DETAILS_BY_USER_REQUEST,
  CURRENCY_DETAILS_BY_USER_SUCCESS,
  CURRENCY_DETAILS_FAIL,
  CURRENCY_DETAILS_REQUEST,
  CURRENCY_DETAILS_SUCCESS,
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
  CURRENCY_REGISTER_FAIL,
  CURRENCY_REGISTER_REQUEST,
  CURRENCY_REGISTER_SUCCESS,
  CURRENCY_SELL_FAIL,
  CURRENCY_SELL_REQUEST,
  CURRENCY_SELL_SUCCESS,
  SEND_EMAIL_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from "../constants/constants";

export const currencyListReducer = (state = { currencies: [] }, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return {
        loading: true,
        currencies: [],
      };
    case CURRENCY_LIST_SUCCESS:
      return {
        loading: false,
        currencies: action.payload,
      };
    case CURRENCY_LIST_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const currencyDetailsReducer = (state = { currency: [] }, action) => {
  switch (action.type) {
    case CURRENCY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CURRENCY_DETAILS_SUCCESS:
      return { loading: false, currency: action.payload };
    case CURRENCY_DETAILS_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
export const currencyRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_REGISTER_REQUEST:
      return { loading: true };
    case CURRENCY_REGISTER_SUCCESS:
      return { loading: false, sell: action.payload };
    case CURRENCY_REGISTER_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export const currencyDetailsbyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_DETAILS_BY_USER_REQUEST:
      return { loading: true };
    case CURRENCY_DETAILS_BY_USER_SUCCESS:
      return { loading: false, wallet: action.payload };
    case CURRENCY_DETAILS_BY_USER_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
export const currencySellReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_SELL_REQUEST:
      return { loading: true };
    case CURRENCY_SELL_SUCCESS:
      return { loading: false, sell: action.payload };
    case CURRENCY_SELL_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export const sendMailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return { loading: true };
    case SEND_EMAIL_SUCCESS:
      return { loading: false, send: action.payload };
    case SEND_EMAIL_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
