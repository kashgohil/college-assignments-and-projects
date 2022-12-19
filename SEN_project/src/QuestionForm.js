import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { QForm } from "./QForm.js";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const validationSchema = Yup.object({
  que: Yup.string("Enter Question").required("Question is required"),
  o1: Yup.string("").required("Option is required"),
  o2: Yup.string("").required("Option is required"),
  o3: Yup.string("").required("Option is required"),
  o4: Yup.string("").required("Option is required"),
  ans: Yup.string("")
    .required("Answer is required")
    .uppercase("Option Answer can only be values A, B, C or D")
    .length(1, "Option Answer can only be values A, B, C or D")
    .matches(/(A|B|C|D)/, "Option Answer can only be values A, B, C or D")
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

  state = {
    job_id: 0
  };

  handleSubmit = (values, { props = this.props }) => {
    const a = this.props.que_no + 1;
    console.log(a);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/addquestion",
      data: {
        job_id: this.props.job_id,
        question: values.que,
        option_a: values.o1,
        option_b: values.o2,
        option_c: values.o3,
        option_d: values.o4,
        right_answer: values.ans
      }
    }).then(response => {
      console.log(response.data);
    });

    return;
  };

  render() {
    const classes = this.props;
    const values = {
      que: this.props.que,
      o1: this.props.o1,
      o2: this.props.o2,
      o3: this.props.o3,
      o4: this.props.o4,
      ans: this.props.ans
    };

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Formik
            render={props => <QForm {...props} />}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoginForm);
