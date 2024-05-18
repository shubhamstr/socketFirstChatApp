import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, setUserType } from '../../store/authSlice';
// eslint-disable-next-line no-unused-vars
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  // IconButton,
  TextField,
  // Link,
  ButtonGroup,
  Typography
} from '@material-ui/core';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// eslint-disable-next-line no-unused-vars
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const schema = {
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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
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
  }
}));

const LogIn = props => {
  const dispatch = useDispatch();

  const { history } = props;

  const classes = useStyles();

  const [loginType, setLoginType] = useState('social');

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

  // const handleBack = () => {
  //   history.goBack();
  // };

  const changeLoginType = loginType => {
    setLoginType(loginType);
  };

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

  const handleSocialLogIn = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('handleSocialLogIn');
  };

  const handleLogIn = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('handleLogIn');
    dispatch(logIn());
    dispatch(
      setUserType({
        userType: 'user'
      })
    );
    history.push('/dashboard');
  };

  const hasError = field =>
    formStateEmail.touched[field] && formStateEmail.errors[field]
      ? true
      : false;

  const hasErrorNew = field =>
    formStateGuest.touched[field] && formStateGuest.errors[field]
      ? true
      : false;

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
              <form className={classes.form} onSubmit={handleLogIn}>
                <Typography className={classes.title} variant="h2">
                  Log in
                </Typography>
                <ButtonGroup
                  aria-label="outlined primary button group"
                  className={classes.btnGroup}
                  color="primary">
                  <Button onClick={() => changeLoginType('social')}>
                    With Social Media
                  </Button>
                  <Button onClick={() => changeLoginType('guest')}>
                    As Guest
                  </Button>
                  <Button onClick={() => changeLoginType('email')}>
                    With Email
                  </Button>
                </ButtonGroup>
                {loginType === 'social' && (
                  <>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary">
                      Log in with social media
                    </Typography>
                    <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}>
                      {/* <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSocialLogIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid> */}
                      <Grid container>
                        <Button
                          fullWidth
                          onClick={handleSocialLogIn}
                          size="large"
                          variant="contained">
                          <GoogleIcon className={classes.socialIcon} />
                          Login with Google
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}

                {loginType === 'guest' && (
                  <>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1">
                      Log in as guest
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasErrorNew('username')}
                      fullWidth
                      helperText={
                        hasErrorNew('username')
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
                      size="large"
                      type="submit"
                      variant="contained">
                      Log in
                    </Button>
                  </>
                )}

                {loginType === 'email' && (
                  <>
                    <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1">
                      Log in with email address
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      helperText={
                        hasError('email')
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
                      error={hasError('password')}
                      fullWidth
                      helperText={
                        hasError('password')
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
                      className={classes.logInButton}
                      color="primary"
                      disabled={!formStateEmail.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained">
                      Log in
                    </Button>
                  </>
                )}
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography> */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

LogIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(LogIn);
