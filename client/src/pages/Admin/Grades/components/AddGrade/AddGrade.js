import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  withStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './styles';

class AddGrade extends Component {
  state = {
    grade: '',
    _assignment: '',
    _student: '',
    students: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { _assignment } = this.state;
    if (prevState._assignment !== _assignment) {
      this.fetchAssignmentStudents(_assignment);
    }
  }

  componentDidMount() {
    if (this.props.selectedGrade) {
      const { grade, _assignment, _student } = this.props.selectedGrade;
      this.setState({
        grade,
        _assignment: _assignment._id,
        _student: _student._id
      });
    }
  }

  fetchAssignmentStudents = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/api/assignments/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const assignment = await response.json();
      if (response.ok) {
        const students = assignment._students
          .filter(student => student._assignments.includes(id))
          .map(({ _user, _id }) => ({ ..._user, _student: _id }));
        this.setState({ students });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddGrade = () => {
    const grade = { ...this.state };
    this.props.addGrade(grade);
  };

  onUpdateGrade = () => {
    const grade = { ...this.state };
    this.props.updateGrade(grade, this.props.selectedGrade._id);
  };

  render() {
    const { classes, className, selectedGrade, assignments } = this.props;
    const { grade, _assignment, _student, students } = this.state;
    const rootClassName = classNames(classes.root, className);
    const mainTitle = selectedGrade ? 'Edit Grade' : 'Add Grade';
    const submitButton = selectedGrade ? 'Update Grade' : 'Add Grade';
    const submitAction = selectedGrade ? () => this.onUpdateGrade() : () => this.onAddGrade();

    const assignmentsOptions = assignments.length
      ? assignments.map(({ title, _id }) => ({ text: title, value: _id }))
      : [];
    const studentsOptions = students.length
      ? students.map(({ _id, email, _student }) => ({ text: email, value: _student, key: _id }))
      : [];

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              helperText="Please specify the Grade"
              label="Grade"
              margin="dense"
              required
              value={grade}
              variant="outlined"
              onChange={event => this.handleFieldChange('grade', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" fullWidth className={classes.textField}>
              <InputLabel id="assignment-label">Assignment</InputLabel>
              <Select
                labelId="assignment-label"
                id="assignment"
                value={_assignment}
                onChange={event => this.handleFieldChange('_assignment', event.target.value)}
              >
                {assignmentsOptions.map(({ text, value }) => (
                  <MenuItem key={`assignment-${value}`} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select Assignment</FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth className={classes.textField}>
              <InputLabel id="students-label">Student</InputLabel>
              <Select
                labelId="students-label"
                id="students"
                value={_student}
                onChange={event => this.handleFieldChange('_student', event.target.value)}
              >
                {studentsOptions.map(({ text, value, key }) => (
                  <MenuItem key={`student-${value}-${key}`} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select Student</FormHelperText>
            </FormControl>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}
        >
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddGrade.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddGrade);
