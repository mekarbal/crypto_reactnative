import axios from "axios";
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
  SEND_EMAIL_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from "../constants/constants";

export const listCurrencies = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_LIST_REQUEST });

    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins");

    dispatch({ type: CURRENCY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CURRENCY_LIST_FAIL, payload: error.message });
  }
};
export const currencyDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `https://api.coincap.io/v2/assets/${id}/history?interval=h2&start=${
        Date.now() - 85800000
      }&end=${Date.now()}`
    );

    dispatch({
      type: CURRENCY_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const currencyRegister =
  (id, cryp_name, value, currencyPrice) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: CURRENCY_REGISTER_REQUEST });

      const { data } = await axios.post("http://localhost:3000/wallet/add", {
        id: `${id}`,
        cryp_name: cryp_name,
        value: value,
        currencyPrice: currencyPrice,
      });

      console.log(data);
      dispatch({ type: CURRENCY_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CURRENCY_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const currencySell =
  (id, cryp_name, value, currencyPrice) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: CURRENCY_REGISTER_REQUEST });

      const { data } = await axios.post("http://localhost:3000/wallet/sell", {
        idUser: `${id}`,
        currencyName: cryp_name,
        value: value,
        currencyPrice: currencyPrice,
      });
      dispatch({ type: CURRENCY_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CURRENCY_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const sendMail =
  (to, subject, text, name, value, price) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: SEND_EMAIL_REQUEST });

      const { data } = await axios.post(
        "http://localhost:3000/mail/send",
        {
          to: to,
          subject: subject,
          text: text,
          name: name,
          value: value,
          price: price,
        },
        config
      );

      console.log(data);
      dispatch({ type: SEND_EMAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SEND_EMAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const currencyDetailsByUserId = (id) => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_DETAILS_BY_USER_REQUEST });
    const { data } = await axios.get(`http://localhost:3000/wallet/${id}`);

    dispatch({
      type: CURRENCY_DETAILS_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DETAILS_BY_USER_FAIL,
      payload: error,
    });
  }
};
