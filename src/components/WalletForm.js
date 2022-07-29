import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import Input from './Input';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { storedCurrencies } = this.props;
    return (
      <form>
        <Input
          name="value"
          type="number"
          placeholder="Valor"
          dataTestId="value-input"
          value={ value }
          onChange={ this.handleInput }
        />
        <Input
          name="description"
          type="text"
          placeholder="Descrição"
          dataTestId="description-input"
          value={ description }
          onChange={ this.handleInput }
        />
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleInput }
        >
          {
            storedCurrencies
              .map((ticker) => <option key={ ticker } value={ ticker }>{ticker}</option>)
          }
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleInput }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleInput }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (store) => ({
  storedCurrencies: store.wallet.currencies,
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  storedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
