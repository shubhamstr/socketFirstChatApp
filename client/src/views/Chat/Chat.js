/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { ChatScreen } from './components';
import { getAllUsersAPI } from '../../api/users';
import { setDetails } from '../../store/authSlice';
import { BASE_URL } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Chat = () => {
  const url = window.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const classes = useStyles();
  const socket = io(BASE_URL, { transports: ['websocket'] });

  const auth = useSelector(state => state.auth);
  const { userDetails, tokenDetails, userType, userList } = auth;

  socket.on('connected', user => {
    console.log('socket connected', user);
    // getAllUsersList();
  });

  // const getAllUsersList = () => {
  //   const resp = getAllUsersAPI({
  //     ignoreUserId: tokenDetails.userId
  //   });
  //   resp.then(res => {
  //     // console.log(res);
  //     if (res.err) {
  //       alert(res.msg);
  //     } else {
  //       dispatch(
  //         setDetails({
  //           type: 'userList',
  //           value: res.data
  //         })
  //       );
  //       // console.log(auth);
  //     }
  //   });
  // };

  const getUserDetails = () => {
    const resp = getAllUsersAPI({
      userId: tokenDetails.userId
    });
    resp.then(res => {
      if (res.err) {
        alert(res.msg);
      } else {
        dispatch(
          setDetails({
            type: 'userDetails',
            value: res.data[0]
          })
        );
        // console.log(auth);
      }
    });
  };

  useEffect(() => {
    console.log(url);
    // console.log(userType);
    if (Object.keys(userDetails).length === 0) {
      getUserDetails();
    }
    // if (Object.keys(userList).length === 0) {
    //   getAllUsersList();
    // }
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
