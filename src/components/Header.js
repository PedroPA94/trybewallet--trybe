import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpensesValue = expenses.reduce((acc, cur) => {
      const { currency, value, exchangeRates } = cur;
      const rate = parseFloat(exchangeRates[currency].ask);
      return acc + parseFloat(value) * rate;
    }, 0);
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpensesValue.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
