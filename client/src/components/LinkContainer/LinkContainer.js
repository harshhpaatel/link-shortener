import React, { Component } from "react";
import "./LinkContainer.css";

class LinkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="link-container">
        <div className="link-container-side "></div>
        <div className="link-container-box">hi</div>
      </div>
    );
  }
}

export default LinkContainer;
