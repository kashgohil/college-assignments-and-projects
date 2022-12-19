import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { JForm } from "./JForm.js";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const validationSchema = Yup.object({
  title: Yup.string("Enter title").required("Title is required"),
  salary: Yup.number("Salary must be a positive integer")
    .required("Salary is required")
    .positive("Salary must be a positive integer")
    .integer("Salary must be a positive integer"),
  cpi: Yup.number("Enter CPI")
    .required("CPI is required")
    .positive("CPI must be positive")
    .lessThan(10, "CPI must be less than 10"),
  skills: Yup.string("Enter skills").required("Skills are required"),
  experience: Yup.string("Enter experience").required("Experience is required"),
  work: Yup.string("Enter work").required("Work is required"),
  hires: Yup.number("Enter number of hires")
    .required("Number of hires is required")
    .positive("Number of hires must be positive")
    .integer("Number of hires must be an integer"),
  perks: Yup.string("Enter perks and benifits").required(
    "Perks and benefits are required"
  ),
  wcpi: Yup.number("Enter CPI weightage")
    .required("CPI weightage is required")
    .positive("CPI weightage must be positive")
    .integer("CPI weightage must be an integer"),
  wexperience: Yup.number("Enter Experience weightage")
    .required("Experience weightage is required")
    .positive("Experience weightage must be positive")
    .integer("Experience weightage must be an integer"),
  wskills: Yup.number("Enter skills weightage")
    .required("Skills weightage is required")
    .positive("Skills weightage must be positive")
    .integer("Skills weightage must be an integer"),
  wtest: Yup.number("Enter test weightage")
    .required("Test weightage is required")
    .positive("Test weightage must be positive")
    .integer("Test weightage must be an integer"),
  startdate: Yup.string("Select Start Date").required("Select Start Date"),
  starttime: Yup.string("Select Start Time").required("Select Start Time"),
  enddate: Yup.string("Select End Date").required("Select End Date"),
  endtime: Yup.string("Select End Time").required("Select End Time")
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

class JobForm extends Component {
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
    open: false
  };

  handleSubmit = (values, { props = this.props }) => {
    var x = new Date();
    x = x.toDateString();
    console.log(x);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/post",
      data: {
        title: values.title,
        salary: values.salary,
        cpi: values.cpi,
        skills: values.skills,
        experience: values.experience,
        work: values.work,
        hires: values.hires,
        perks: values.perks,
        wcpi: values.wcpi,
        wskills: values.wskills,
        wtest: values.wtest,
        wexperience: values.wexperience,
        deadline: values.deadline,
        startdate: values.startdate,
        starttime: values.starttime,
        enddate: values.enddate,
        endtime: values.endtime,
        applicants: 0,
        addedon: x
      }
    }).then(response => {});
    console.log(values);
    this.setState({ open: true });

    return;
  };

  render() {
    const classes = this.props;
    const values = {
      title: "",
      salary: "",
      cpi: "",
      skills: "",
      experience: "",
      work: "",
      hires: "",
      perks: "",
      wcpi: "",
      wskills: "",
      wtest: "",
      wexperience: "",
      deadline: ""
    };

    return (
      <React.Fragment>
        <div>
          <Formik
            render={props => <JForm {...props} />}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          autoHideDuration={3000}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Job post successful.</span>}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(JobForm);
