import React from "react";
import Display from "../Display/Display";
import Keyboard from "../Keyboard/Keyboard";
import buttonList from "../resources/buttonlist.json";
import "./Calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTxt: "0",
      equation: [],
    };

    // this.maxHistoryLength = 45;
    this.testNumberRegex = new RegExp(/^\-?\d+$|^\-?\d+\.\d*$/);

    this.evaluateKey = this.evaluateKey.bind(this);
    this.reset = this.reset.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.hasDecimal = this.hasDecimal.bind(this);
    this.getLastEquationItem = this.getLastEquationItem.bind(this);
    this.updateDisplayText = this.updateDisplayText.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.insertDecimal = this.insertDecimal.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.addNumericalValue = this.addNumericalValue.bind(this);
  }

  reset() {
    this.setState({
      displayTxt: "0",
      equation: [],
    });
  }

  isNumber(toTest) {
    return (
      toTest !== undefined &&
      toTest !== null &&
      this.testNumberRegex.test(toTest)
    );
  }

  hasDecimal(item) {
    return item !== null && item !== undefined && 0 < item.indexOf(".");
  }

  getLastEquationItem() {
    return 0 < this.state.equation.length
      ? this.state.equation[this.state.equation.length - 1]
      : undefined;
  }

  updateDisplayText() {
    this.setState({ displayTxt: this.getLastEquationItem() });
  }

  calculateResult() {
    let result = 0;
    if (0 < this.state.equation.length) {
      for (let i = 0; i < this.state.equation.length; i = i + 2) {
        let currentValue = parseFloat(this.state.equation[i]);
        if (i === 0) {
          result += currentValue;
        } else {
          switch (this.state.equation[i - 1]) {
            case "/":
              result /= currentValue * 1.0;
              break;
            case "X":
              result *= currentValue;
              break;
            case "-":
              result -= currentValue;
              break;
            case "+":
              result += currentValue;
              break;
          }
        }
      }
    }
    return result.toString();
  }

  insertDecimal() {
    let lastItem = this.getLastEquationItem();
    if (!this.isNumber(lastItem)) {
      this.setState({ equation: [...this.state.equation, "0."] }, () =>
        this.updateDisplayText()
      );
    } else if (!this.hasDecimal(lastItem)) {
      this.setState(
        {
          equation: [
            ...this.state.equation.slice(0, this.state.equation.length - 1),
            `${lastItem}.`,
          ],
        },
        () => this.updateDisplayText()
      );
    } else {
      this.updateDisplayText();
    }
  }

  addOperator(operator) {
    let lastItem = this.getLastEquationItem();
    console.log(lastItem);

    if (0 < this.state.equation.length) {
      let newEquation;
      if (parseInt(lastItem) === -0) {
        //Find the index of the last number
        let lastNumberIndex = 0;
        this.state.equation.map((x, i) => {
          if (this.isNumber(x) && x !== lastItem) {
            lastNumberIndex = i;
          }
        });
        newEquation = [
          ...this.state.equation.slice(0, lastNumberIndex + 1),
          operator,
        ];
      } else if (this.isNumber(lastItem)) {
        newEquation = [...this.state.equation, operator];
      } else if (operator === "-") {
        newEquation = [...this.state.equation, "-0"];
      } else {
        newEquation = [
          ...this.state.equation.slice(0, this.state.equation.length - 1),
          operator,
        ];
      }
      this.setState({ equation: newEquation }, () => this.updateDisplayText());
    }
  }

  addNumericalValue(numericalValue) {
    let lastItem = this.getLastEquationItem();
    let newEquation = null;
    if (this.state.equation.length <= 0 || !this.isNumber(lastItem)) {
      newEquation = [...this.state.equation, numericalValue];
    } else {
      let insertItem;
      if (parseInt(lastItem) === -0 && !this.hasDecimal(lastItem)) {
        insertItem = -1 * parseInt(numericalValue);
      } else if (this.hasDecimal(lastItem) || 0 <= lastItem.indexOf("-")) {
        insertItem = lastItem + numericalValue;
      } else {
        insertItem = parseInt(lastItem) * 10 + parseInt(numericalValue);
      }
      newEquation = [
        ...this.state.equation.slice(0, this.state.equation.length - 1),
        insertItem.toString(),
      ];
    }
    this.setState({ equation: newEquation }, () => this.updateDisplayText());
  }

  evaluateKey(e) {
    let lastItem = this.getLastEquationItem();
    switch (e.target.value) {
      case "":
        this.reset();
        break;
      case ".":
        this.insertDecimal();
        break;
      case "=":
        //Reset the state, then set the result into the state
        this.reset();
        this.setState({ equation: [this.calculateResult()] }, () =>
          this.updateDisplayText()
        );
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        this.addOperator(e.target.value);
        break;
      default:
        this.addNumericalValue(e.target.value);
        break;
    }
  }

  render() {
    return (
      <div class="calculator">
        <Display
          displayTxt={this.state.displayTxt}
          equation={this.state.equation}
        />
        <Keyboard evaluateKey={this.evaluateKey} buttonList={buttonList} />
      </div>
    );
  }
}

export default Calculator;
