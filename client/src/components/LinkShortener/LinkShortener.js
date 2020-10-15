import React, { Component } from "react";
import logo from "../../logo.svg";
import "./LinkShortener.css";
import NewLinkForm from "../NewLinkForm/NewLinkForm";
import AllLinks from "../AllLinks/AllLinks";
import axios from "axios";

class LinkShortener extends Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  state = {
    data: [],
  };

  refresh() {
    this.getLinks();
  }

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
        <div className="container">
          <h2 className="page-title mb-0">Dashboard</h2>
          <p className="page-subtitle code">
            Total Links: {this.state.data.length}
          </p>
        </div>
        <div className="container mt-5">
          <NewLinkForm refresh={this.refresh} />
        </div>
        <div className="container mt-5">
          <AllLinks data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default LinkShortener;
