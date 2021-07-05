import React from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { Home } from "./home";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      phone: "",
      errors: {},
      redirect:null,
      registerStatus:'',
      
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }
  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      Axios.post("http://localhost:3001/register", {
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
      }).then((response) => {
        if(response.data.message){
          this.setState({registerStatus:response.data.message})
        }else{
          
        }
      });
    }
  };

  validate() {
    let name = this.state.userName;
    let email = this.state.email;
    let password = this.state.password;
    let phone = this.state.phone;
    let errors = {};
    let valid = true;
    var pattern = new RegExp(/^[0-9\b]+$/);
    var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (name == null || name.length == 0) {
      valid = false;
      errors["name"] = "Please enter your name";
    }
    if (password == null || password.length == 0) {
      valid = false;
      errors["password"] = "Please enter a password";
    } else if (password.length < 8) {
      errors["password"] = "Password must contain at least 8 characters!";
    }
    if (email != null || email.length > 0) {
      if(!emailPattern.test(email)){
        valid=false;
        errors["email"] = "Please enter a valid email";

      }
      
    }else{
      valid = false;
      errors["email"] = "Please enter your email";

    }
    if (phone != null || phone.length > 0) {
      if (!pattern.test(phone)) {
        valid = false;
        errors["phone"] = "Please enter a valid phone number";
      } else if (phone.length != 10) {
        valid = false;
        errors["phone"] = "Please enter a valid 10-digit phone number";
      }
    } else {
      valid = false;
      errors["phone"] = "Please enter your phone number";
    }

    this.setState({
      errors: errors
    });

    return valid;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="form-box register-container">
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <h1>Register</h1>

          {this.state.registerStatus=='Register Successful!' ? (
        <div className="messageSuccess">
          <p>{this.state.registerStatus} </p>
        </div>) : <div className="message">
          <p>{this.state.redirect} </p>
        </div>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.userName}
            onChange={this.handleUserNameChange}
          />
          <span class="text-danger">{this.state.errors.name}</span>

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

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handlePhoneChange}
          />
          <span class="text-danger">{this.state.errors.phone}</span>

          <button type="submit" className="btn-form">
            Register
          </button>
        </form>
      </div>
    );
  }
}
