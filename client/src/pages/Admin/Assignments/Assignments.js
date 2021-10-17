import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { AssignmentsToolbar, AssignmentsTable, AddAssignment } from './components';
import {
  getStudentProfile,
  getTeacherProfile,
  getUsers,
  getAssignments,
  deleteAssignment,
  selectAssignment,
  selectAllAssignments,
  toggleAssignmentDialog,
  addAssignment,
  updateAssignment
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import { match } from '../../../utils';

class Assignments extends Component {
  state = { search: '' };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { user, getUsers, getAssignments, getStudentProfile, getTeacherProfile } = this.props;
    const isAdmin = user && user.role === 'admin';
    const isTeacher = user && user.role === 'teacher';
    const isStudent = user && user.role === 'student';

    if (isStudent) getStudentProfile();
    if (isTeacher) getTeacherProfile();
    if (isAdmin) {
      getAssignments();
      getUsers();
    }
  }

  handleSelect = selectedAssignments => {
    this.setState({ selectedAssignments });
  };

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { search } = this.state;
    const {
      user,
      classes,
      assignments,
      students,
      teachers,
      selectedAssignments,
      openDialog,
      toggleAssignmentDialog,
      addAssignment,
      selectAssignment,
      selectAllAssignments,
      updateAssignment,
      deleteAssignment
    } = this.props;

    const isAdmin = user && user.role === 'admin';

    const filteredAssigments = match(search, assignments, 'title');

    return (
      <div className={classes.root}>
        {isAdmin && (
          <AssignmentsToolbar
            assignments={filteredAssigments}
            search={search}
            onChangeSearch={this.onChangeSearch}
            selectedAssignments={selectedAssignments}
            toggleDialog={toggleAssignmentDialog}
            deleteAssignment={() => deleteAssignment(selectedAssignments[0])}
          />
        )}
        <div className={classes.content}>
        
          {!filteredAssigments.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <AssignmentsTable
              isAdmin={isAdmin}
              onSelect={selectAssignment}
              onSelectAll={selectAllAssignments}
              assignments={filteredAssigments}
              selectedAssignments={selectedAssignments}
            />
          )}
        </div>
        <ResponsiveDialog
          id="Add-Assignment"
          open={openDialog}
          handleClose={() => toggleAssignmentDialog()}
        >
          <AddAssignment
            selectedAssignment={assignments.find(assignment => assignment._id === selectedAssignments[0])}
            addAssignment={addAssignment}
            teachers={teachers}
            students={students}
            updateAssignment={updateAssignment}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ authState, userState, assignmentState }) => ({
  user: authState.user,
  teachers: userState.users.filter(user => user.role === 'teacher'),
  students: userState.users.filter(user => user.role === 'student'),
  assignments: assignmentState.assignments,
  selectedAssignments: assignmentState.selectedAssignments,
  openDialog: assignmentState.openDialog
});
const mapDispatchToProps = {
  getStudentProfile,
  getTeacherProfile,
  getUsers,
  getAssignments,
  selectAssignment,
  selectAllAssignments,
  toggleAssignmentDialog,
  addAssignment,
  updateAssignment,
  deleteAssignment
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Assignments));
