import { createStore } from 'react-redux';

const store = createStore();

if (window.Cypress) {
  window.store = store;
}

export default store;
