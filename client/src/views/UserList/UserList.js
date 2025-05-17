import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';

import { UsersListToolbar, UsersListTable } from './components';
import { getAllUsersAPI } from '../../api/users';
import { setDetails } from '../../store/authSlice';
// import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { userList } = auth;

  // const [users] = useState(mockData);

  const getAllUsersList = () => {
    const resp = getAllUsersAPI({});
    resp.then(res => {
      if (res.err) {
        alert(res.msg);
      } else {
        dispatch(
          setDetails({
            type: 'userList',
            value: res.data
          })
        );
        // console.log(res.data);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(userList).length === 0) {
      getAllUsersList();
    }
  }, []);

  return (
    <div className={classes.root}>
      <UsersListToolbar />
      <div className={classes.content}>
        <UsersListTable users={userList} />
      </div>
    </div>
  );
};

export default UserList;
