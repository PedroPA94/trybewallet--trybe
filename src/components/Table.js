import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { storedExpenses, deleteButton, editButton } = this.props;
    const headers = ['Descrição', 'Categoria', 'Forma de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Ações'];
    return (
      <section className="expenses-table">
        { storedExpenses.length > 0
          ? (
            <table>
              <thead>
                <tr>
                  {
                    headers.map((header, index) => <th key={ index }>{header}</th>)
                  }
                </tr>
              </thead>
              <tbody>
                {
                  storedExpenses.map(({
                    id, description, tag, method, value, exchangeRates, currency,
                  }) => {
                    const { name, ask } = exchangeRates[currency];
                    const convertedValue = parseFloat(value) * parseFloat(ask);
                    return (
                      <tr key={ id }>
                        <td data="Descrição">{description}</td>
                        <td data="Categoria">{tag}</td>
                        <td data="Forma de pagamento">{method}</td>
                        <td data="Valor">{parseFloat(value).toFixed(2)}</td>
                        <td data="Moeda">{name}</td>
                        <td data="Câmbio utilizado">{parseFloat(ask).toFixed(2)}</td>
                        <td data="Valor Convertido">{convertedValue.toFixed(2)}</td>
                        <td data="Moeda de conversão">Real</td>
                        <td data="Ações">
                          <div className="action-btns">
                            <button
                              type="button"
                              onClick={ () => deleteButton(id) }
                              data-testid="delete-btn"
                              className="delete-btn"
                            >
                              <FaTrash />
                            </button>
                            <button
                              type="button"
                              onClick={ () => editButton(id) }
                              data-testid="edit-btn"
                              className="edit-btn"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>)
          : <h2>Sem despesas registradas</h2>}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (id) => dispatch(deleteExpense(id)),
  editButton: (id) => dispatch(editExpense(id)),
});

const mapStateToProps = (store) => ({
  storedExpenses: store.wallet.expenses,
});

Table.propTypes = {
  storedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteButton: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
