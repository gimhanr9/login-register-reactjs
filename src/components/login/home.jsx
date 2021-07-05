import React from "react";

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-body">
        <div className="home-container">
          <div className="welcome-text">
            <h1>Welcome</h1>
            <p>
              You are now logged into your account. You can logout anytime by
              pressing the button below!
            </p>
            <a href="">Logout</a>
          </div>
        </div>
      </div>
    );
  }
}
