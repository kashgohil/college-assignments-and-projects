import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./LoginRegister.css";
import LoginForm from "./LoginForm";
import Homepage from "./Homepage.svg";

class LoginRegister extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <p id="wel">Welcome to Analyx.</p>
        <AppBar position="relative" id="appbar" backgroundColor="black">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Login" id="pls" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <div id="login">
            <LoginForm />
          </div>
        )}
      </div>
    );
  }
}

export default LoginRegister;
