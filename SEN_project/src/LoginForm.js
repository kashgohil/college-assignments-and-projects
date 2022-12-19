import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { LForm } from "./LForm.js";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password")
});

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`
  },
  container: {
    maxWidth: "200px"
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  state = {
    open: false,
    isloggedIn: false,
    emailid: ""
  };

  handleSubmit = (values, { props = this.props }) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: {
        emailid: values.email,
        password: values.password
      }
    }).then(response => {
      if (response.data === "Password is wrong") {
        this.setState({ open: true });
      } else {
        this.setState({ emailid: "yashjogi" });
        this.setState({ isloggedIn: true });
      }
    });

    return;
  };

  render() {
    const classes = this.props;
    const values = { email: "", password: "" };
    if (this.state.isloggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { emailid: this.state.emailid }
          }}
        />
      );
    } else {
      return (
        <React.Fragment>
          <div className={classes.container}>
            <Formik
              render={props => <LForm {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.handleSubmit}
            />
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            autoHideDuration={3000}
            open={this.state.open}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id">
                Please enter registered EmailID or Password.
              </span>
            }
          />
        </React.Fragment>
      );
    }
  }
}

export default withStyles(styles)(LoginForm);
