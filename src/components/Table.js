import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { storedExpenses, deleteButton } = this.props;
    const headers = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <table>
        {
          headers.map((header, index) => <th key={ index }>{header}</th>)
        }
        <tbody>
          {
            storedExpenses.map(({
              id, description, tag, method, value, exchangeRates, currency,
            }) => {
              const { name, ask } = exchangeRates[currency];
              const convertedValue = parseFloat(value) * parseFloat(ask);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{parseFloat(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{parseFloat(ask).toFixed(2)}</td>
                  <td>{convertedValue.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => deleteButton(id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (store) => ({
  storedExpenses: store.wallet.expenses,
});

Table.propTypes = {
  storedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
