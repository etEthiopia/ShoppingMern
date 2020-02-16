import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  NavLink
} from "reactstrap";
import uuid from "uuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      email: "",
      password: "",
      cpassword: "",
      message: null
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle = () => {
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

    this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Add To Shopping List </ModalHeader>{" "}
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Label for="name"> Name </Label>{" "}
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Full Name."
                onChange={this.onChange}
              />{" "}
              <Label for="email"> Email </Label>{" "}
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address."
                onChange={this.onChange}
              />{" "}
              <Label for="password"> Password </Label>{" "}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password."
                onChange={this.onChange}
              />{" "}
              <Input
                type="cpassword"
                name="cpassword"
                id="cpassword"
                placeholder="Re-Enter Password."
                onChange={this.onChange}
              />{" "}
              <Button
                type="submit"
                style={{
                  marginTop: "2rem",
                  float: "right"
                }}
              >
                Add Register{" "}
              </Button>{" "}
            </Form>{" "}
          </ModalBody>{" "}
        </Modal>{" "}
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {})(RegisterModal);
