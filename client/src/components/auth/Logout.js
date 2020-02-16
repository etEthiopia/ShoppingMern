import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";

import PropTypes from "prop-types";

class Logout extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          logout
        </NavLink>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, {
  logout
})(Logout);
