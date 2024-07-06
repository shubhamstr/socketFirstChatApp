/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ChatScreen } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetailsApi } from '../../api/users';
import { setDetails } from '../../store/authSlice';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Chat = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const auth = useSelector(state => state.auth);
  const { userDetails, tokenDetails, userType } = auth;

  useEffect(() => {
    // console.log(userType);
    if (Object.keys(userDetails).length === 0) {
      const resp = getUserDetailsApi({
        userId: tokenDetails.userId
      });
      resp.then(res => {
        if (res.data.err) {
          alert(res.data.msg);
        } else {
          dispatch(
            setDetails({
              type: 'userDetails',
              value: res.data.data[0]
            })
          );
          // console.log(auth);
        }
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <ChatScreen />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
