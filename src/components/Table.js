import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const headers = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <table>
        {
          headers.map((header, index) => <th key={ index }>{header}</th>)
        }
      </table>
    );
  }
}
