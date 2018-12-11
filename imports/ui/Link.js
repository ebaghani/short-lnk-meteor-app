import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Link, BrowserRouter} from "react-router-dom";
import {Links} from "../api/links";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinksListFilters from "./LinksListFilters";

// import {browserHistory} from "react-router";

export default () => {
  return (
    <div>
       <PrivateHeader title="Short Lnk" />
       <div className="page-content">
          <LinksListFilters/>
          <AddLink/>
          <LinksList/>
       </div>
    </div>
  );
}
