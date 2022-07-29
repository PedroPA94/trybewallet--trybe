import USER_LOGIN, { DELETE_EXPENSE, SAVE_CURRENCIES, SAVE_EXPENSE } from './actionTypes';

const loginUser = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSE,
  payload: expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export function requestFromAPI(newExpense) {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(endpoint);
    const data = await request.json();
    if (newExpense) {
      return dispatch(saveExpenses({ ...newExpense, exchangeRates: data }));
    }
    const currencies = Object
      .keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(saveCurrencies(currencies));
  };
}

export default loginUser;
