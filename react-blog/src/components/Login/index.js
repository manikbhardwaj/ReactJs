/* eslint-disable */
import React from "react";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: []
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = await this.props.loginUser(this.state);
      this.props.setAuthUser(user);
    } catch (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <LoginForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        handleErrors={this.state.errors}
      />
    );
  }
}

export default Login;
