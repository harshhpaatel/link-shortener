import React, { useState, useEffect } from 'react';
import './NewLinkForm.css';
import axios from 'axios';
import validator from 'validator';
import refreshLinks from '../LinkShortener/LinkShortener';
import { API_ORIGIN } from '../util';

function NewLinkForm(props) {
  const [url, SetUrl] = useState('');
  const [customext, SetCustomext] = useState('');
  const [link, SetLink] = useState('');
  const [error, SetError] = useState('');
  const [status, SetStatus] = useState(null);

  function handleChange(e) {
    if (e.target.name === 'url') {
      SetUrl(e.target.value);
    } else if (e.target.name === 'customext') {
      SetCustomext(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let validURL = null;
    if (url) {
      validURL = validator.isURL(url, {
        require_protocol: true,
      });
    }
    if (!validURL) {
      SetError('Check URL Formating. URL must include the http(s) protocol');
      SetStatus(409);
    } else {
      console.log('URL is: ', url);
      // POST Values.
      axios
        .post(`${API_ORIGIN}/api/shorten`, {
          url: url,
          customext: customext,
        })
        .then((res) => {
          console.log(res.data);
          let currentUrl = window.location.origin;
          SetLink(`${currentUrl}/${res.data.hash}`);
          if (res.data.status === 409) {
            SetError('This link already exists');
            SetStatus(409);
          } else if (res.data.status === 400) {
            SetError('The custom extension already exists');
            SetStatus(400);
          } else {
            SetError(null);
            SetStatus(200);
            // Updates state in parent component to re-render links
            props.updateLinkRender();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const ResultText = (props) => {
    const result = props.result;
    if (result === 409 || result === 406 || result === 400) {
      return <p className="mt-3 mb-0 error-message">{error}</p>;
    } else if (result != null) {
      return (
        <p className="mt-3 mb-0 success-message">
          <span>New Link: </span>
          <a
            href={link}
            className="success-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        </p>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="form-box">
      <h3 className="component-title">Create a new link</h3>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control form-input code"
              name="url"
              placeholder="Enter long URL"
              onChange={handleChange}
            />
          </div>
          <div className="col-4 ">
            <input
              type="text"
              className="form-control form-input code"
              name="customext"
              placeholder="Custom extension (optional)"
              onChange={handleChange}
            />
          </div>
          <div className="px-3">
            <button type="submit" className="btn form-button">
              Create
            </button>
          </div>
        </div>
      </form>
      <ResultText result={status} />
    </div>
  );
}

export default NewLinkForm;
