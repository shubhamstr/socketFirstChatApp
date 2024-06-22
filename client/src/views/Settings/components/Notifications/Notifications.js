// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { setDetails } from '../../../../store/authSlice';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotificationApi } from '../../../../api/users';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;

  const [user, setUser] = useState(userDetails);

  const classes = useStyles();

  const handleChange = e => {
    // console.log(e.target.name, e.target.checked);
    setUser(prev => {
      return { ...prev, [e.target.name]: e.target.checked ? 1 : 0 };
    });
  };

  const handleSave = async () => {
    // console.log(user);
    const resp = await updateNotificationApi({
      id: user.id,
      email_notification_flag: user.email_notification_flag,
      push_notification_flag: user.push_notification_flag,
      email_message_flag: user.email_message_flag,
      push_message_flag: user.push_message_flag
    });
    if (resp.data.err) {
      alert(resp.data.msg);
    } else {
      dispatch(
        setDetails({
          type: 'userDetails',
          value: user
        })
      );
      alert(resp.data.msg);
    }
  };

  // useEffect(() => {
  //   console.log(userDetails);
  //   console.log(user);
  // }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Notifications
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.email_notification_flag === 1}
                    color="primary"
                  />
                }
                label="Email"
                name="email_notification_flag"
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.push_notification_flag === 1}
                    color="primary"
                  />
                }
                label="Push Notifications"
                name="push_notification_flag"
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Text Messages"
              /> */}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Phone calls"
              /> */}
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Messages
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.email_message_flag === 1}
                    color="primary"
                  />
                }
                label="Email"
                name="email_message_flag"
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.push_message_flag === 1}
                    color="primary"
                  />
                }
                label="Push Notifications"
                name="push_message_flag"
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Phone calls"
              /> */}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" onClick={handleSave} variant="outlined">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
