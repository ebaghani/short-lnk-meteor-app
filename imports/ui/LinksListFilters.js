import React from "react";
import { Tracker } from 'meteor/tracker';
import { Links } from "../api/links";
import { Meteor } from 'meteor/meteor';
import LinksListItem from "./LinksListItem";
import { Session } from 'meteor/session';

export default class LinksListFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           showVisible: true
        }
    }

    componentDidMount() {
        this.linksFilterTracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState({showVisible});
          });
    }

    componentWillUnmount() {
        console.log("Component will  unmount from LinksListFilters");
        this.linksFilterTracker.stop();
    }
    render() {
        return (<div><label  className="checkbox">
            <input type="checkbox" className="checkbox__box" checked={!this.state.showVisible} onChange={(e) => {Session.set('showVisible', !e.target.checked)}}/>
            show hidden links.
            </label></div>);
    }

 }

