import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import assignments from './assignments';
import grades from './grades';
import profile from './profile';

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  assignmentState: assignments,
  gradeState: grades,
  profileState: profile
});
