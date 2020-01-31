import React, { Component } from "react";

import { Button, Form, FormGroup } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader, Label, Input } from "reactstrap";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = e => {
    this.setState({ [e.target.value]: e.target.value });
  };

  render() {
    return (
      <div>
        <Button style={{ marginBottom: "2rem" }} onClick={this.toggle}>
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            {/* onSubmit={this.onSubmit} */}
            <Form>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping Item"
                onChange={this.onChange}
              />
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect()(ItemModal);
