import React, { Component } from 'react';
import './LinkContainer.css';

class LinkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="link-container position-relative mb-3">
        <div className="link-container-side position-absolute"></div>
        <div className="link-container-box position-relative">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control form-input code"
                placeholder="Enter long URL"
                value={this.props.longURL}
              />
            </div>
            <div className="col-4 ">
              <input
                type="text"
                className="form-control form-input code"
                placeholder="Custom extension (optional)"
                value={this.props.linkID}
              />
            </div>
            <div className="px-3 d-flex align-items-center">
              <p className="mb-0">
                <span className="bold">Clicks:</span> {this.props.clicksCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkContainer;
