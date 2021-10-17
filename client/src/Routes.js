import React, { lazy, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';
import { history } from './utils';
import { Assignment } from '@material-ui/icons';

// Admin
const Account = lazy(() => import('./pages/Admin/Account/Account'));
const User = lazy(() => import('./pages/Admin/User/User'));
const Assignments = lazy(() => import('./pages/Admin/Assignments/Assignments'));
const Grades = lazy(() => import('./pages/Admin/Grades/Grades'));

// Student
 const Upload = lazy(() => import('./pages/Student/Assignments/UploadAssignment'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register/Register'));
const Login = lazy(() => import('./pages/Public/Login/Login'));

// Public
// const Home = lazy(() => import('./pages/Public/HomePage/HomePage'));

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" layout={PublicLayout} component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/admin/account" layout={AdminLayout} component={Account} />
        <ProtectedRoute exact path="/admin/users" layout={AdminLayout} component={User} />
        <ProtectedRoute exact path="/admin/assignments" layout={AdminLayout} component={Assignments} />
        <ProtectedRoute exact path="/admin/grades" layout={AdminLayout} component={Grades} />
        <ProtectedRoute exact path="/upload/assignment" layout={AdminLayout} component={Upload} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </Router>
  </Suspense>
);

export default Routes;
