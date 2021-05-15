import React, { Component } from "react";
import "./AllLinks.css";
import LinkContainer from "../LinkContainer/LinkContainer";

class AllLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const DisplayLinks = (props) => {
      const links = props.links;
      if (!links) {
        console.log(links);
        console.log("fail");
        return <div></div>;
      } else {
        return links.map((link) => (
          <LinkContainer
            longURL={link.url}
            linkID={link._id}
            clicksCount={link.clicks}
          />
        ));
      }
    };

    return (
      <div>
        <DisplayLinks links={this.props.data} />
      </div>
    );
  }
}

export default AllLinks;
