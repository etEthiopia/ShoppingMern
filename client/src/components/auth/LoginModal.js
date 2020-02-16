import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      message: null
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for the register error by id
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          message: error.message.message
        });
      } else {
        this.setState({
          message: null
        });
      }
    }
    // If Authenticated Close Modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.email && this.state.password) {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };

      // Attempt to register
      this.props.login(newUser);
    } else {
      this.setState({
        message: "Enter Credientails"
      });
    }

    //this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login{" "}
        </NavLink>{" "}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Login </ModalHeader>{" "}
          <ModalBody>
            {" "}
            {this.state.message ? (
              <Alert color="danger"> {this.state.message} </Alert>
            ) : null}{" "}
            <Form onSubmit={this.onSubmit}>
              <Label for="email"> Email </Label>{" "}
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address."
                className="mb-3"
                onChange={this.onChange}
              />{" "}
              <Label for="password"> Password </Label>{" "}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password."
                className="mb-3"
                onChange={this.onChange}
              />{" "}
              <Button
                type="submit"
                style={{
                  marginTop: "2rem",
                  float: "right"
                }}
              >
                Sign In{" "}
              </Button>{" "}
            </Form>{" "}
          </ModalBody>{" "}
        </Modal>{" "}
      </div>
    );
  }
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {
  login,
  clearErrors
})(LoginModal);
