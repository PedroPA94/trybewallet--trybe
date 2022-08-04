import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestFromAPI, saveEditedExpense } from '../redux/actions';
import '../styles/WalletForm.css';
import Input from './Input';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  async componentDidMount() {
    const { handleAPI } = this.props;
    handleAPI();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { storedExpenses, handleAPI } = this.props;
    const id = storedExpenses.length;
    const newExpense = { id, ...this.state };
    handleAPI(newExpense);
    this.setState({
      value: '',
      description: '',
    });
  }

  handleEdit = () => {
    const { storedExpenses, setEditedExpense, idToEdit } = this.props;
    const editedExpense = storedExpenses.find(({ id }) => id === idToEdit);
    const expenseToDispatch = { ...editedExpense, ...this.state };
    setEditedExpense(expenseToDispatch);
    this.setState({
      value: '',
      description: '',
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
    const {
      storedCurrencies,
      editor,
    } = this.props;
    const buttonDisabled = Object.values(this.state).includes('');
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
          <option value="" disabled selected hidden>
            Moeda
          </option>
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
          <option value="" disabled selected hidden>
            Forma de pagamento
          </option>
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
          <option value="" disabled selected hidden>
            Categoria
          </option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ editor ? this.handleEdit : this.handleSubmit }
          disabled={ buttonDisabled }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAPI: (newExpense) => dispatch(requestFromAPI(newExpense)),
  setEditedExpense: (editedExpense) => dispatch(saveEditedExpense(editedExpense)),
});

const mapStateToProps = (store) => ({
  storedCurrencies: store.wallet.currencies,
  storedExpenses: store.wallet.expenses,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,
});

WalletForm.propTypes = {
  handleAPI: PropTypes.func.isRequired,
  storedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  storedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number,
  setEditedExpense: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  idToEdit: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
