import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonalApi } from '../../../../api/users';
import { setDetails } from '../../../../store/authSlice';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();

  const classes = useStyles();

  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;

  const [values, setValues] = useState({
    // firstName: 'Shen',
    // lastName: 'Zhi',
    // email: 'shen.zhi@devias.io'
    // phone: '',
    // state: 'Alabama',
    // country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const states = [
  //   {
  //     value: 'alabama',
  //     label: 'Alabama'
  //   },
  //   {
  //     value: 'new-york',
  //     label: 'New York'
  //   },
  //   {
  //     value: 'san-francisco',
  //     label: 'San Francisco'
  //   }
  // ];

  const onSubmit = async event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    // console.log('onSubmit', values);
    const resp = await updatePersonalApi(values);
    if (resp.data.err) {
      alert(resp.data.msg);
    } else {
      let userData = { ...userDetails, username: values.userName };
      // console.log(userData);
      dispatch(
        setDetails({
          type: 'userDetails',
          value: userData
        })
      );
      alert(resp.data.msg);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log(userDetails);
    setValues({
      ...values,
      id: userDetails.id,
      userName: userDetails.username,
      email: userDetails.email
    });
  }, [userDetails]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="User Name"
                margin="dense"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" onClick={onSubmit} variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
