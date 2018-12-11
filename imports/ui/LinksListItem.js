import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import moment from 'moment';



export default class LinksListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           copied: false,
           buttonText: "copy"
        }
    }

    componentDidMount(){
      this.clipboard =  new Clipboard(this.refs.copy);
      this.clipboard.on("success", () => {
         // alert("It worked!");
          this.setState({copied: true, buttonText: "copied"});
          setTimeout(() => { this.setState({copied: false, buttonText: "copy"}); } , 1000);
      }).on("error", () => {
        alert("Unable to copy!");
      });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount ===1 ? 'visit' : 'visits';
        let visitedMessage = null;
        if (typeof this.props.lastVisitedAr === 'number') {
            let momentNow = moment(this.props.lastVisitedAr);
            visitedMessage = `(visited ${momentNow.fromNow()})`;
        }
        return ( <p className="item__message"> {this.props.visitedCount} {visitMessage} - {visitedMessage}</p>
        );
    }

    render() {
      return (<div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <div>
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                <button  className="button button--pill" ref="copy"data-clipboard-text={this.props.shortUrl}>{this.state.buttonText}</button>
                <button  className="button button--pill" ref="hide" onClick={() => {
                        Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                    }}>{this.props.visible ? "Hide" : "Unhide"}</button>
                </div>
              </div>);
    }
  };

  LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAr: PropTypes.number
  };