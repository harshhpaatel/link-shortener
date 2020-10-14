import React, { Component } from "react";
import "./NewLinkForm.css";

class NewLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="form-box">
        <h3 className="component-title">Create a new link</h3>
        <form className="mt-4">
          <div className="row">
            <div class="col">
              <input
                type="text"
                className="form-control form-input code"
                id="name"
                placeholder="Enter long URL"
              />
            </div>
            <div className="col-4 ">
              <input
                type="text"
                class="form-control form-input code"
                id="name"
                placeholder="Custom extension (optional)"
              />
            </div>
            <div className="px-3">
              <button type="button" class="btn form-button">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewLinkForm;
