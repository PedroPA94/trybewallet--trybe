import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { userLoggedIn } = this.props;
    return (
      <div className="content">
        { !userLoggedIn && <Redirect to="/" />}
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userLoggedIn: store.user.loggedIn,
});

Wallet.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
