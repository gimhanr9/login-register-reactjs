import React from "react";
import Axios from "axios";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginStatus: "",

      errors: {},
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  
  handleSubmit = (event) => {
    
    event.preventDefault();
    if (this.validate()) {
      Axios.post("http://localhost:3001/login", {
        email: this.state.email,
        password: this.state.password,
      }).then((response) => {
        if (response.data.message) {
          this.setState({ loginStatus: response.data.message });
        } else {
        }
      });
      this.setState({ email: "" });
      this.setState({ password: "" });
    }
  };

  validate() {
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let valid = true;
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (email != null || email.length > 0) {
      if (!emailPattern.test(email)) {
        valid = false;
        errors["email"] = "Please enter a valid email";
      }
    } else {
      valid = false;
      errors["email"] = "Please enter your email";
    }
    if (password == null || password.length == 0) {
      valid = false;
      errors["password"] = "Please enter a password";
    }

    this.setState({
      errors: errors,
    });

    return valid;
  }
  

  render() {
    
    return (
      <div className="form-box login-container">
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.state.loginStatus == "Login successful!" ? (
            <div className="messageSuccess">
              <p>{this.state.loginStatus} </p>
            </div>
          ) : (
            <div className="message">
              <p>{this.state.loginStatus} </p>
            </div>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <span class="text-danger">{this.state.errors.email}</span>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <span class="text-danger">{this.state.errors.password}</span>

          <button type="submit" className="btn-form">
            Login
          </button>
        </form>
      </div>
    );
  }
}
