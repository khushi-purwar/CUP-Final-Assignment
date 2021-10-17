import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../components';

// Component styles
import styles from './styles';

class Account extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  componentDidMount() {
    const { name, email } = this.props.user;
    this.setState({ name, email });
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onUpdateUser = async () => {
    try {
      const { name, email, password } = this.state;
      const token = localStorage.getItem('jwtToken');
      let body = { name, email };
      if (password) body = { ...body, password };
      const url = '/api/users/me';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes, className } = this.props;
    const { name, email, password } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletHeader>
          <PortletLabel  title="Features of the DashBoard : " />
        </PortletHeader>
        <PortletContent Padding>
       <PortletLabel  list="1. Admin can add/update/delete assignment "  Padding/>
       <PortletLabel  list="2. Admin can add/update/delete student " Padding />
       <PortletLabel  list="3. Admin can add/update/delete teacher " Padding />
        </PortletContent>
        
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
