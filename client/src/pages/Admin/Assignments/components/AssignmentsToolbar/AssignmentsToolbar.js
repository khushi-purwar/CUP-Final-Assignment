import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { SearchInput } from '../../../../../components';
import styles from './styles';

const AssignmentsToolbar = props => {
  const {
    classes,
    className,
    toggleDialog,
    selectedAssignments,
    deleteAssignment,
    search,
    onChangeSearch
  } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
       

        <div>
          {selectedAssignments.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={deleteAssignment}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button onClick={toggleDialog} color="primary" size="small" variant="outlined">
            {selectedAssignments.length === 1 ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

AssignmentsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedAssignments: PropTypes.array
};

AssignmentsToolbar.defaultProps = {
  selectedAssignments: []
};
export default withStyles(styles)(AssignmentsToolbar);
