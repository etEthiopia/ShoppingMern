import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "react-bootstrap";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div>
            <AppNavbar />
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
