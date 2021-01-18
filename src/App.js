import React from "react";
import Display from "./components/basicCal/component/Display";
import ButtonPanel from "./components/basicCal/component/ButtonPanel";
import calculate from "./components/basicCal/logic/calculate";
import Header from './components/Header';
import "./App.css";
import { object } from "prop-types";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    count: 0
  };

  handleClick = buttonName => {
    
    this.setState(calculate(this.state, buttonName));
    this.state.count++;

  };

  render() {
    return (
      <div className="App">
          <Header/>
          <div className="component-app">
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          </div>
      </div>
      
    );
  }
}
