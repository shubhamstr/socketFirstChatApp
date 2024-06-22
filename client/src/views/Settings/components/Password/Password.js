import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { updatePasswordApi } from '../../../../api/users';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;
  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdate = async () => {
    // console.log(values);
    if (values.password === values.confirm) {
      const resp = await updatePasswordApi({
        id: userDetails.id,
        newPassword: values.password
      });
      if (resp.data.err) {
        alert(resp.data.msg);
      } else {
        alert(resp.data.msg);
      }
    } else {
      alert('Password not matched!!');
    }
  };

  useEffect(() => {
    // console.log(userDetails);
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" onClick={handleUpdate} variant="outlined">
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
