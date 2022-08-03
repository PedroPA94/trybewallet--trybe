import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import '../styles/Header.css';
import Logo from './Logo';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpensesValue = expenses.reduce((acc, cur) => {
      const { currency, value, exchangeRates } = cur;
      const rate = parseFloat(exchangeRates[currency].ask);
      return acc + parseFloat(value) * rate;
    }, 0);
    return (
      <header>
        <Logo />
        <div className="user">
          <FaUserAlt className="user-symbol" />
          <section className="user-info">
            <p data-testid="email-field">{email}</p>
            <div className="expenses">
              <p data-testid="total-field">{totalExpensesValue.toFixed(2)}</p>
              <p data-testid="header-currency-field">BRL</p>
            </div>
          </section>
        </div>
      </header>
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
