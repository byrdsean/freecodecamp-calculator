import React from "react";
import "./Display.css";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.parseEquationToString = this.parseEquationToString.bind(this);
  }

  parseEquationToString() {
    return this.props.equation.length <= 0
      ? "0"
      : this.props.equation.join(" ");
  }

  render() {
    return (
      <div id="overallDisplay">
        <div id="displayHistory">{this.parseEquationToString()}</div>
        <div id="display">{this.props.displayTxt}</div>
      </div>
    );
  }
}

export default Display;
