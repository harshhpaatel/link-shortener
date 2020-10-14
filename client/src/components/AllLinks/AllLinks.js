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
        <LinkContainer
          longURL="https://www.figma.com/file/TdHagLIG2HXl0CsNgb0dql/Link-Shortener?node-id=2%3A1"
          linkID="go.harshpatel.ca/figmaproject"
          clicksCount="12"
        />
      </div>
    );
  }
}

export default AllLinks;
