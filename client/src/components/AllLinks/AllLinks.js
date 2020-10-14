import React, { Component } from "react";
import "./AllLinks.css";
import LinkContainer from "../LinkContainer/LinkContainer";

class AllLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <LinkContainer />
      </div>
    );
  }
}

export default AllLinks;
