import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const [user, setUser] = useState({});

  const classes = useStyles();

  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(userDetails);
    const name = userDetails.firstName
      ? userDetails.firstName + ' ' + userDetails.lastName
      : userDetails.userName;
    const avatar = userDetails.image
      ? userDetails.image
      : '/images/avatars/avatar_11.png';
    setUser({
      name,
      avatar
      // bio: 'Brain Director'
    });
  }, [userDetails]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      {/* <Typography variant="body2">{user.bio}</Typography> */}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
