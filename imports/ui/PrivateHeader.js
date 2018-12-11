import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Accounts} from "meteor/accounts-base";

const PrivateHeader = (props) => {
    return(
        <div className="title-bar">
            <div className="title-bar__content">
            <h1>{props.title}</h1>
            <button className="button--link-text" onClick={ () => { Accounts.logout() } }>Logout</button>
            </div>
        </div>
    )
}

export default PrivateHeader;

// export default class PrivateHeader extends React.Component {

//     render() {
//         return (
//             <div>
//             <h1>{this.props.title}</h1>
//             <button onClick={ () => { Accounts.logout() } }>Log out</button>
//             </div>
//         )
//     };
// }

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
  };