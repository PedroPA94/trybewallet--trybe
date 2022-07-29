import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import loginUser from '../redux/actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin = () => {
    const { doLogin, history } = this.props;
    const { email } = this.state;
    doLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const buttonEnabled = (
      /\w+@\w+.com/.test(email) && password.length >= MIN_PASSWORD_LENGTH
    );
    return (
      <div>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          dataTestId="email-input"
          value={ email }
          onChange={ this.handleInput }
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          min={ MIN_PASSWORD_LENGTH }
          dataTestId="password-input"
          value={ password }
          onChange={ this.handleInput }
        />
        <button
          type="button"
          disabled={ !buttonEnabled }
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
