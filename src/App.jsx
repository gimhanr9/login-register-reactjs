import React from "react";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { LoginForm, RegisterForm, Home } from "./components/login/index";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
    };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <div className="body">
      <Router>
        <Switch>
          <Route exact path="/home" component={Home}/>

        </Switch>
        
        </Router>
      
        <div
          className={
            "container " +
            (this.state.isRegisterOpen ? "right-panel-active" : "")
          }
        >
          {this.state.isLoginOpen && <LoginForm />}
          {this.state.isRegisterOpen && <RegisterForm />}
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Hello!</h1>
                <p>Enter your details and register with us!</p>

                <button
                  class="ghost"
                  id="signIn"
                  onClick={this.showLoginBox.bind(this)}
                >
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <p>Please login with your personal info!</p>

                <button
                  class="ghost"
                  id="signUp"
                  onClick={this.showRegisterBox.bind(this)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
