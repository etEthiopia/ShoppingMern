import React, { Component } from "react";
import {
  Container,
  ListGroup,
  Row,
  ListGroupItem,
  Button
} from "react-bootstrap";
//import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import uuid from "uuid";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Button
          color="dark"
          style={{
            marginBottom: "2rem"
          }}
          onClick={() => {
            const name = prompt("Enter Item");
            if (name) {
              this.setState(state => ({
                items: [
                  ...state.items,
                  {
                    id: uuid(),
                    name
                  }
                ]
              }));
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    style={{
                      marginRight: "1rem"
                    }}
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      this.setState(state => ({
                        items: this.state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList);
