import {
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  TOGGLE_ASSIGNMENT_DIALOG,
  SELECT_ASSIGNMENT,
  SELECT_ALL_ASSIGNMENTS,
  UPLOAD_ASSIGNMENT
} from '../types';

import { setAlert } from './alert';

export const toggleAssignmentDialog = () => ({ type: TOGGLE_ASSIGNMENT_DIALOG });

export const selectAssignment = assignment => ({
  type: SELECT_ASSIGNMENT,
  payload: assignment
});

export const selectAllAssignments = () => ({ type: SELECT_ALL_ASSIGNMENTS });

export const getAssignments = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/assignments';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const assignments = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ASSIGNMENTS, payload: assignments });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addAssignment = assignment => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/assignments/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assignment)
    });
    const data = await response.json();
    const newAssignment = data.assignment;
    if (response.ok) {
      dispatch(setAlert('Assignment Created', 'success', 5000));
      dispatch({ type: ADD_ASSIGNMENT, payload: newAssignment });
      return { status: 'success', message: 'Assignment Created' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Assignment have not been saved, try again.'
    };
  }
};


export const uplaodAssignment = assignment => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/uplaodAssignment/upload';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assignment)
    });
    const data = await response.json();
    const uploadAssignment = data.assignment;
    if (response.ok) {
      dispatch(setAlert('Assignment Uploaded', 'success', 5000));
      dispatch({ type: UPLOAD_ASSIGNMENT, payload: uploadAssignment });
      return { status: 'success', message: 'Assignment Uploaded' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Assignment have not been uploaded, try again.'
    };
  }
};


export const updateAssignment = (assignment, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/assignments/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assignment)
    });
    const data = await response.json();
    const newAssignment = data.assignment;
    if (response.ok) {
      dispatch(setAlert('Assignment Updated', 'success', 5000));
      dispatch({ type: UPDATE_ASSIGNMENT, payload: newAssignment });
      return { status: 'success', message: 'Assignment Updated' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Assignment have not been saved, try again.'
    };
  }
};

export const deleteAssignment = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/assignments/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setAlert('Assignment Deleted', 'success', 5000));
      dispatch({ type: DELETE_ASSIGNMENT, payload: id });
      return { status: 'success', message: 'Assignment Removed' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Assignment have not been deleted, try again.'
    };
  }
};
