import React, { useEffect, useState } from 'react';
import './LinkShortener.css';
import NewLinkForm from '../NewLinkForm/NewLinkForm';
import AllLinks from '../AllLinks/AllLinks';
import axios from 'axios';

function LinkShortener() {
  const [data, SetData] = useState([]);

  const getLinks = async () => {
    return axios
      .get('http://localhost:5000/api/collection')
      .then((response) => {
        console.log('success');
        return response;
      })
      .catch((err) => {
        console.log('error fetching data');
        return { status: 500 };
      });
  };

  async function fetchData() {
    const response = await getLinks();
    console.log(response);
    if (response.status === 200) {
      SetData(response.data);
    }
  }

  function refreshLinks() {
    console.log('refresh Called');
    // fetchData();
  }

  useEffect(() => {
    console.log('Called');
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="page-title mb-0">Dashboard</h2>
        <p className="page-subtitle code">Total Links: {data.length}</p>
      </div>
      <div className="container mt-5">
        <NewLinkForm updateLinkRender={fetchData} />
      </div>
      <div className="container mt-5">
        <AllLinks data={data} />
      </div>
    </div>
  );
}

export default LinkShortener;
