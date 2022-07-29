import USER_LOGIN, { SAVE_CURRENCIES } from './actionTypes';

const loginUser = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(endpoint);
    const data = await request.json();
    const currencies = Object
      .keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(saveCurrencies(currencies));
  };
}

export default loginUser;
