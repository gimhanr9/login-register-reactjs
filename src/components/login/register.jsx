import React from "react";
import Axios from 'axios'

export class RegisterForm extends React.Component {

  
  
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      email: '',
      password:'',
      phone: '',
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }
  handleUserNameChange = (event) => {
    this.setState({userName: event.target.value});
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handlePhoneChange = (event) => {
    this.setState({phone: event.target.value});
  }

  handleSubmit = (event) => {
    Axios.post("http://localhost:3001/register", 
    {userName:this.state.userName, email:this.state.email, password:this.state.password, 
      phone:this.state.phone
  }).then(()=>{



    });
  }

  

  render() {
    
    return (
      <div className="form-container register-container">
        
      
        <form className="loginForm" onSubmit={this.handleSubmit}>
        <h1>Register</h1>
          
            <input type="text" name="name" placeholder="Name" value={this.state.userName} 
            onChange={this.handleUserNameChange} />
          
            <input type="text" name="email" placeholder="Email" value={this.state.email} 
            onChange={this.handleEmailChange} />
          
            <input type="password" name="password" placeholder="Password" value={this.state.password} 
            onChange={this.handlePasswordChange} />
         
            <input type="number" name="phone" placeholder="Phone" value={this.state.phone}
            onChange={this.handlePhoneChange}/>
          

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    );
  }
}
