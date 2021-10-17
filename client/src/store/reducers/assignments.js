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

const initialState = {
  assignments: [],
  selectedAssignments: [],
  openDialog: false
};

const toggleAssignmentDialog = state => ({
  ...state,
  openDialog: !state.openDialog
});

const selectAssignment = (state, payload) => {
  const { selectedAssignments } = state;

  const selectedIndex = selectedAssignments.indexOf(payload);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedAssignments, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedAssignments.slice(1));
  } else if (selectedIndex === selectedAssignments.length - 1) {
    newSelected = newSelected.concat(selectedAssignments.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedAssignments.slice(0, selectedIndex),
      selectedAssignments.slice(selectedIndex + 1)
    );
  }

  return {
    ...state,
    selectedAssignments: newSelected
  };
};

const selectAllAssignments = state => ({
  ...state,
  selectedAssignments: !state.selectedAssignments.length ? state.assignments.map(assignment => assignment._id) : []
});

const getAssignments = (state, payload) => ({
  ...state,
  assignments: payload
});

const addAssignment = (state, payload) => ({
  ...state,
  assignments: [...state.assignments, payload]
});

const updateAssignment = (state, payload) => ({
  ...state,
  assignments: [...state.assignments.filter(assignment => assignment._id !== payload._id), payload]
});

const deleteAssignment = (state, payload) => ({
  ...state,
  assignments: state.assignments.filter(assignment => assignment._id !== payload),
  selectedAssignments: state.selectedAssignments.filter(element => element !== payload)
});

const uploadAssignment = (state, payload) => ({
  ...state,
  assignments: [...state.assignments, payload]
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ASSIGNMENTS:
      return getAssignments(state, payload);
    case TOGGLE_ASSIGNMENT_DIALOG:
      return toggleAssignmentDialog(state);
    case SELECT_ASSIGNMENT:
      return selectAssignment(state, payload);
    case SELECT_ALL_ASSIGNMENTS:
      return selectAllAssignments(state);
    case ADD_ASSIGNMENT:
      return addAssignment(state, payload);
    case UPDATE_ASSIGNMENT:
      return updateAssignment(state, payload);
    case DELETE_ASSIGNMENT:
      return deleteAssignment(state, payload);
    case UPLOAD_ASSIGNMENT:
      return uploadAssignment(state, payload);
    default:
      return state;
  }
};
