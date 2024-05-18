import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import propTypes from 'prop-types';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import './assets/scss/index.scss';
import './assets/index.css';
import validators from './common/validators';
import Routes from './Routes';
import { logIn, setDetails } from './store/authSlice';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {
  checkAuthAndRedirect = () => {
    let token = localStorage.getItem('token');
    // eslint-disable-next-line no-console
    // console.log(token);

    if (token) {
      this.props.logIn();
      let value = token === 'admin@gmail.com' ? 'admin' : 'user';
      this.props.setDetails({
        type: 'userType',
        value: value
      });
      browserHistory.push('/dashboard');
    }
  };
  componentDidMount() {
    this.checkAuthAndRedirect();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  logIn: propTypes.func,
  setDetails: propTypes.func
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = {
  logIn,
  setDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
