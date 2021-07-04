import React from "react";
import Axios from 'axios'


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      loginStatus:'',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/login", {email:this.state.email, password:this.state.password}).then
    ((response)=>{
      if(response.data.message){
        this.setState({loginStatus:response.data.message})
      }else{

      }

    });
  }


  render() {
    return (
      
        
      <div className="form-container login-container">
        
        
        

        <form className="loginForm" onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div className="message">
          <p>{this.state.loginStatus} </p>
        </div>
          
            
            <input type="text" name="email" placeholder="Email" value={this.state.email} 
            onChange={this.handleEmailChange} />
      

            
          
            <input type="password" name="password" placeholder="Password" value={this.state.password} 
            onChange={this.handlePasswordChange} />
         

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
      
      
    );
  }
}
