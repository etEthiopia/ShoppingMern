import React, { Component } from "react";

import { Button, Form } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader, Label, Input } from "reactstrap";
import uuid from "uuid";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: ""
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

    const newItem = {
      id: uuid(),
      name: this.state.name
    };

    this.props.addItem(newItem);

    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            style={{
              marginBottom: "2rem"
            }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4"> Please log in to manage Items. </h4>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Add To Shopping List </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Label for="item"> Item </Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping Item"
                onChange={this.onChange}
              />
              <Button
                type="submit"
                style={{
                  marginTop: "2rem",
                  float: "right"
                }}
              >
                Add Item
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  addItem
})(ItemModal);
