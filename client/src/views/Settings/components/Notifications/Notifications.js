import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
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
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const [user, setUser] = useState({});

  const classes = useStyles();

  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log(userDetails);
    setUser({
      email_notification_flag: userDetails.email_notification_flag,
      push_notification_flag: userDetails.push_notification_flag,
      email_message_flag: userDetails.email_message_flag,
      push_message_flag: userDetails.push_message_flag
    });
  }, [userDetails]);

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
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.push_notification_flag === 1}
                    color="primary"
                  />
                }
                label="Push Notifications"
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
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.push_message_flag === 1}
                    color="primary"
                  />
                }
                label="Push Notifications"
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
          <Button color="primary" variant="outlined">
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
