import React from "react";
import "./Keyboard.css";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.buttonList.map((x) => (
          <div class={x.gridClass}>
            <button id={x.id} value={x.value} onClick={this.props.evaluateKey}>
              {x.displayText}
            </button>
          </div>
        ))}
      </>
    );
  }
}

export default Keyboard;
