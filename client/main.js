import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import "./main.html";
import {routes, onAuthChange } from './../imports/routes/routes.js';
import { Session } from 'meteor/session';
import { Links } from "../imports/api/links";
import "../imports/startup/simple-schema-configuration";



Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
	console.log('VISIBILITY:', Session.get('visibility'));
	onAuthChange(isAuthenticated);
});


Meteor.startup(() => {
  // Meteor.call("greetUser", "Mike", (err, res) => {
  //   console.log('greet user arguments:', err, res);
  // });
  // Meteor.call("addNumbers", 5, "what?", (err, res) => {
  //   console.log('add numbers is:', err, res);
  // });
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});

 

