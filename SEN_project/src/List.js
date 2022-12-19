import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Jobbox from "./Components/Jobbox";
import Appbox from "./Components/Appbox";
import Profile from "./Components/Profile";
import Testbox from "./Components/TestBox";
import CV from "./Components/CV";
import Notification from "./Components/Notification";
import "./List.css";
import JobTab from "./Components/JobTab.js";
import JobForm from "./JobForm.js";
import AppTab from "./Components/AppTab.js";
import TestTab from "./Components/TestTab.js";
import LoginForm from "./LoginForm";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
class List extends Component {
  state = {
    value: 0,
    jobname: "Software Engineer",
    jobadddate: "27/12/120",
    jobdead: "28/12/1200",
    salary: "Rs. 80000"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} id="bar">
            <Tab label="Jobs" />
            <Tab label="Post job" />
            <Tab label="Test" />
          </Tabs>
        </AppBar>
        {value === 0 && <JobTab />}
        {value === 1 && (
          <div id="iamdone">
            <JobForm />{" "}
          </div>
        )}
        {value === 2 && <TestTab />}
      </div>
    );
  }
}

export default List;
