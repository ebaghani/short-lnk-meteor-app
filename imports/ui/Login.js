import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

export default class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: ''
      }
    }

    onSubmit(e) {
      e.preventDefault();

      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();
      Meteor.loginWithPassword({email}, password, (err) => {
        if (err) {
          this.setState({ error: "Unable to login. Please check username and password."});
        } else {
          this.setState({ error: ''});
        }
      });

      // Accounts.createUser({email, password}, (err) => {  console.log("Signup callback", err); });
    }

    render() {
      return (<div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link Login</h1>
          {/* <p>{this.state.count}</p> */}
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" password="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Do not have an account?</Link>
        </div>
      </div>);
    }
  }