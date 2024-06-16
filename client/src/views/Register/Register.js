import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logIn, setDetails } from '../../store/authSlice';
import { jwtDecode } from 'jwt-decode';
import axiosClient from '../../api/api-client';
import { signUpApi } from '../../api/auth';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  // IconButton,
  TextField,
  Link,
  // FormHelperText,
  // ButtonGroup,
  // Checkbox,
  Typography
} from '@material-ui/core';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  userName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
  // policy: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   checked: true
  // }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  logInButton: {
    margin: theme.spacing(2, 0)
  },
  btnGroup: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  linkText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const Register = props => {
  const dispatch = useDispatch();

  const { history } = props;

  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [loginType, setLoginType] = useState('email');

  const [formStateEmail, setFormStateEmail] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formStateEmail.values, schema);

    setFormStateEmail(formStateEmail => ({
      ...formStateEmail,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formStateEmail.values]);

  const handleChangeEmail = event => {
    event.persist();

    setFormStateEmail(formStateEmail => ({
      ...formStateEmail,
      values: {
        ...formStateEmail.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formStateEmail.touched,
        [event.target.name]: true
      }
    }));
  };

  const setHeaderToken = token => {
    axiosClient.defaults.headers.common.Authorization = token;
  };

  const setToken = userToken => {
    localStorage.setItem('token', userToken);
  };

  const setTokenAndRedirect = resp => {
    // eslint-disable-next-line no-console
    console.log('setTokenAndRedirect', resp);
    setHeaderToken(resp.data.data);
    setToken(resp.data.data);
    const tokenDetails = jwtDecode(resp.data.data);
    // eslint-disable-next-line no-console
    // console.log(tokenDetails);
    dispatch(
      setDetails({
        type: 'userType',
        value: 'user'
      })
    );
    dispatch(
      setDetails({
        type: 'tokenDetails',
        value: tokenDetails
      })
    );
    dispatch(logIn());
    history.push('/dashboard');
  };

  // const handleBack = () => {
  //   history.goBack();
  // };

  // const changeLoginType = loginType => {
  //   setLoginType(loginType);
  // };

  const handleSignUp = async event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('handleSignUp');
    const resp = await signUpApi({
      registerType: 'email',
      userName: formStateEmail.values.userName,
      email: formStateEmail.values.email,
      password: formStateEmail.values.password
    });
    if (resp.data.err) {
      alert(resp.data.msg);
    } else {
      setTokenAndRedirect(resp);
    }
  };

  const hasErrorEmail = field =>
    formStateEmail.touched[field] && formStateEmail.errors[field]
      ? true
      : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            {/* <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div> */}
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Create new account
                </Typography>
                {/* <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Use your email to create new account
                </Typography> */}
                {/* <ButtonGroup
                  aria-label="outlined primary button group"
                  className={classes.btnGroup}
                  color="primary">
                  <Button onClick={() => changeLoginType('guest')}>
                    As Guest
                  </Button>
                  <Button onClick={() => changeLoginType('email')}>
                    With Email
                  </Button>
                </ButtonGroup> */}

                {loginType === 'email' && (
                  <>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1">
                      Register with email
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasErrorEmail('userName')}
                      fullWidth
                      helperText={
                        hasErrorEmail('userName')
                          ? formStateEmail.errors.userName[0]
                          : null
                      }
                      label="User name"
                      name="userName"
                      onChange={handleChangeEmail}
                      type="text"
                      value={formStateEmail.values.userName || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasErrorEmail('email')}
                      fullWidth
                      helperText={
                        hasErrorEmail('email')
                          ? formStateEmail.errors.email[0]
                          : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChangeEmail}
                      type="text"
                      value={formStateEmail.values.email || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasErrorEmail('password')}
                      fullWidth
                      helperText={
                        hasErrorEmail('password')
                          ? formStateEmail.errors.password[0]
                          : null
                      }
                      label="Password"
                      name="password"
                      onChange={handleChangeEmail}
                      type="password"
                      value={formStateEmail.values.password || ''}
                      variant="outlined"
                    />
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!formStateEmail.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained">
                      Register now
                    </Button>
                  </>
                )}

                {/* <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div> */}
                {/* {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )} */}
                <Typography
                  className={classes.linkText}
                  color="textSecondary"
                  variant="body1">
                  Already an account?{' '}
                  <Link component={RouterLink} to="/log-in" variant="h6">
                    Log In
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.object
};

export default withRouter(Register);
