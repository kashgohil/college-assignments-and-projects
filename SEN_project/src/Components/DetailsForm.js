import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { DForm } from "./DForm.js";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";

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

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const classes = this.props;
    const values = { email: "", password: "" };
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Formik
            render={props => <DForm {...props} />}
            initialValues={values}
            validationSchema={validationSchema}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DetailsForm);
