import { Meteor } from 'meteor/meteor';
import "../imports/api/users";
import "../imports/api/links";
import { Links } from "../imports/api/links";
import "../imports/startup/simple-schema-configuration";
import { WebApp } from "meteor/webapp";

Meteor.startup(() => {

  WebApp.connectHandlers.use( (req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id); 
    } else {
      next();
    }

  });

  WebApp.connectHandlers.use( (req, res, next) => {
    //console.log('This is from my custom middleware');
    //console.log(req.url, req.method, req.headers, req.query);
    // res.statusCode = 404;
    // res.setHeader('my-custom-header', 'Erfan was here');
    // res.write('<h1>Hello world!</h1>');
    // res.end();
    next();
  });
  // code to run on server at 
  // Meteor.call("greetUser", (err, res) => {
  //   console.log('greet user arguments:', err, res);
  // });
});
