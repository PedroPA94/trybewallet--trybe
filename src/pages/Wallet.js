import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="content">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
