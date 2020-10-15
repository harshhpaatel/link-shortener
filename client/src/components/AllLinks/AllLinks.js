import React, { Component } from "react";
import "./AllLinks.css";
import LinkContainer from "../LinkContainer/LinkContainer";
import axios from "axios";

class AllLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    data: [],
  };

  componentDidMount() {
    this.getLinks();
  }

  getLinks = () => {
    axios
      .get("http://localhost:5000/api/collection")
      .then((response) => {
        const data = response.data;
        this.setState({
          data: data,
        });
      })
      .catch(() => {
        console.log("error fetching data");
      });
  };

  render() {
    return (
      <div>
        {this.state.data[Object.keys(this.state.data)[0]]}
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
