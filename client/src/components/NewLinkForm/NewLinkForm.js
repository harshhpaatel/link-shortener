import React, { Component } from "react";
import "./NewLinkForm.css";
import axios from "axios";
import validator from "validator";

class NewLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    url: "",
    customext: "",
    link: "",
    error: "",
    status: null,
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };

  handleSubmit = (e, props) => {
    e.preventDefault();
    console.log(e);
    var validURL = null;
    if (this.state.url) {
      validURL = validator.isURL(this.state.url, {
        require_protocol: true,
      });
    }
    if (!validURL) {
      this.setState({
        error: "Check URL Formating. URL must include the http(s) protocol",
        status: 409,
      });
    } else {
      console.log("URL is: ", this.state.url);
      //POST Values
      axios
        .post("http://localhost:5000/api/shorten", {
          url: this.state.url,
          customext: this.state.customext,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            link: `https://go.harshpatel.ca/${res.data.hash}`,
          });
          if (res.data.status == 409) {
            this.setState({
              error: "This link already exists",
              status: 409,
            });
          } else if (res.data.status == 400) {
            this.setState({
              error: "The custom extension already exists",
              status: 400,
            });
          } else {
            this.setState({
              error: null,
              status: 200,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const ResultText = (props) => {
      const result = props.result;
      if (result == 409 || result == 406 || result == 400) {
        return <p className="mt-3 mb-0 error-message">{this.state.error}</p>;
      } else if (result != null) {
        return (
          <p className="mt-3 mb-0 success-message">
            <span>New Link: </span>
            <a href={this.state.link} className="success-link" target="_blank">
              {this.state.link}
            </a>
          </p>
        );
      } else {
        return <div></div>;
      }
    };

    return (
      <div className="form-box">
        <h3 className="component-title">Create a new link</h3>
        <form className="mt-4" onSubmit={this.handleSubmit}>
          <div className="row">
            <div class="col">
              <input
                type="text"
                className="form-control form-input code"
                name="url"
                placeholder="Enter long URL"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4 ">
              <input
                type="text"
                class="form-control form-input code"
                name="customext"
                placeholder="Custom extension (optional)"
                onChange={this.handleChange}
              />
            </div>
            <div className="px-3">
              <button type="submit" class="btn form-button">
                Create
              </button>
            </div>
          </div>
        </form>
        <ResultText result={this.state.status} />
      </div>
    );
  }
}

export default NewLinkForm;
