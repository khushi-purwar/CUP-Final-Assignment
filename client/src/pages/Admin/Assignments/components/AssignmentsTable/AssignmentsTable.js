import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';
import { textTruncate } from '../../../../../utils';

class AssignmentsTable extends Component {
  state = {
    selectedAssignments: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    assignments: PropTypes.array.isRequired
  };

  static defaultProps = {
    assignments: [],
    onSelect: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getAssignmentTeacher = ({ _teacher }) => {
    if (_teacher) {
      const { _user } = _teacher;
      if (_user) {
        const { name, email } = _user;
        return [name, email];
      }
    }
    return ['', ''];
  };

  render() {
    const {
      classes,
      className,
      isAdmin,
      assignments,
      selectedAssignments,
      onSelect,
      onSelectAll
    } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {isAdmin && (
                    <Checkbox
                      checked={selectedAssignments.length === assignments.length}
                      color="primary"
                      indeterminate={
                        selectedAssignments.length > 0 && selectedAssignments.length < assignments.length
                      }
                      onChange={onSelectAll}
                    />
                  )}
                  Title
                </TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Assigned Teacher</TableCell>
                <TableCell align="left">Teacher Email</TableCell>
                <TableCell align="left">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments &&
                assignments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(assignment => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={assignment._id}
                      selected={selectedAssignments.indexOf(assignment._id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          {isAdmin && (
                            <Checkbox
                              checked={selectedAssignments.indexOf(assignment._id) !== -1}
                              color="primary"
                              onChange={() => onSelect(assignment._id)}
                              value="true"
                            />
                          )}
                          <Typography className={classes.nameText} variant="body1">
                            {assignment.title}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {textTruncate(assignment.description, 100)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getAssignmentTeacher(assignment)[0]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getAssignmentTeacher(assignment)[1]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(assignment.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
         
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(AssignmentsTable);
