import React, { Component } from "react";
import logo from "../../logo.svg";
import "./LinkShortener.css";
import NewLinkForm from "../NewLinkForm/NewLinkForm";
import AllLinks from "../AllLinks/AllLinks";

class LinkShortener extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="page-title mb-0">Dashboard</h2>
          <p className="page-subtitle code">Total Links: 2</p>
        </div>
        <div className="container mt-5">
          <NewLinkForm />
        </div>
        <div className="container">
          <AllLinks />
        </div>
      </div>
    );
  }
}

export default LinkShortener;
