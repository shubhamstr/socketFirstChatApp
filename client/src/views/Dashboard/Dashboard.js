/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Chat,
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetailsApi } from '../../api/users';
import { setDetails } from '../../store/authSlice';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
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
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestSales />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestProducts />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
