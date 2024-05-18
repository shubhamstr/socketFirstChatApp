import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RouteWithLayout, PrivateRouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  LogIn as LogInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  const auth = useSelector(state => state.auth);
  return (
    <Switch>
      {/* guest routes */}
      <Redirect exact from="/" to={auth.isLoggedIn ? '/dashboard': 'log-in'} />
      <RouteWithLayout
        component={LogInView}
        exact
        layout={MinimalLayout}
        path="/log-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      {/* <Redirect to="/not-found" /> */}

      {/* protected routes */}
      <PrivateRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />

      {/* admin routes */}
      <Redirect exact from="/admin/" to="/admin/sign-in" />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/admin/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/admin/sign-in"
      />
    </Switch>
  );
};

export default Routes;
