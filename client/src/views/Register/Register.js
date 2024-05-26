import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logIn, setDetails } from '../../store/authSlice';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  // IconButton,
  TextField,
  Link,
  // FormHelperText,
  ButtonGroup,
  // Checkbox,
  Typography
} from '@material-ui/core';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
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

const schemaNew = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  }
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

  const [loginType, setLoginType] = useState('guest');

  const [formStateEmail, setFormStateEmail] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [formStateGuest, setFormStateGuest] = useState({
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

  useEffect(() => {
    const errorsNew = validate(formStateGuest.values, schemaNew);

    setFormStateGuest(formStateGuest => ({
      ...formStateGuest,
      isValid: errorsNew ? false : true,
      errors: errorsNew || {}
    }));
  }, [formStateGuest.values]);

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

  const handleChangeGuest = event => {
    event.persist();

    setFormStateGuest(formStateEmail => ({
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

  const handleLogIn = (event, type) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('handleLogIn', type);
    // eslint-disable-next-line no-console
    let token = '';
    if (type === 'guest') {
      token = formStateGuest.values.username;
    } else if (type === 'email') {
      token = formStateEmail.values.email;
    }
    localStorage.setItem('token', token);
    dispatch(logIn());
    dispatch(
      setDetails({
        type: 'userType',
        value: 'user'
      })
    );
    history.push('/dashboard');
  };

  // const handleBack = () => {
  //   history.goBack();
  // };

  const changeLoginType = loginType => {
    setLoginType(loginType);
  };

  const handleSignUp = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasErrorEmail = field =>
    formStateEmail.touched[field] && formStateEmail.errors[field]
      ? true
      : false;

  const hasErrorGuest = field =>
    formStateGuest.touched[field] && formStateGuest.errors[field]
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
                <ButtonGroup
                  aria-label="outlined primary button group"
                  className={classes.btnGroup}
                  color="primary">
                  <Button onClick={() => changeLoginType('guest')}>
                    As Guest
                  </Button>
                  <Button onClick={() => changeLoginType('email')}>
                    With Email
                  </Button>
                </ButtonGroup>

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
                      label="User Name"
                      name="userName"
                      onChange={handleChangeEmail}
                      type="text"
                      value={formStateEmail.values.userName || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasErrorEmail('firstName')}
                      fullWidth
                      helperText={
                        hasErrorEmail('firstName')
                          ? formStateEmail.errors.firstName[0]
                          : null
                      }
                      label="First name"
                      name="firstName"
                      onChange={handleChangeEmail}
                      type="text"
                      value={formStateEmail.values.firstName || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasErrorEmail('lastName')}
                      fullWidth
                      helperText={
                        hasErrorEmail('lastName')
                          ? formStateEmail.errors.lastName[0]
                          : null
                      }
                      label="Last name"
                      name="lastName"
                      onChange={handleChangeEmail}
                      type="text"
                      value={formStateEmail.values.lastName || ''}
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

                {loginType === 'guest' && (
                  <>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1">
                      Register as guest
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasErrorGuest('username')}
                      fullWidth
                      helperText={
                        hasErrorGuest('username')
                          ? formStateGuest.errors.username[0]
                          : null
                      }
                      label="Username"
                      name="username"
                      onChange={handleChangeGuest}
                      type="username"
                      value={formStateGuest.values.username || ''}
                      variant="outlined"
                    />
                    <Button
                      className={classes.logInButton}
                      color="primary"
                      disabled={!formStateGuest.isValid}
                      fullWidth
                      onClick={e => handleLogIn(e, 'guest')}
                      size="large"
                      type="button"
                      variant="contained">
                      Register
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
