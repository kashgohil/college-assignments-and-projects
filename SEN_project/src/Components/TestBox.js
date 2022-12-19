import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "./Jobbox.css";
import Test from "../Test.js";

class TestBox extends React.Component {
  state = {
    test: false
  };

  handleClick = (e, item) => {
    this.props.handleJob(item);
  };

  componentDidMount() {
    console.log(this.props.job_id);
  }

  render() {
    return (
      <Paper id="whythe">
        <h3 id="mn">{this.props.title}</h3>
        <div id="nono">
          <text id="xa">Questions: {this.props.numberofquestions}</text>
          <text id="xb">Start-date: {this.props.startdate}</text>
          <text id="xc">Start-time: {this.props.starttime}</text>
          <br />
          <br />
          <text id="xd">Applicants: {this.props.applicants}</text>
          <text id="xe">End-date: {this.props.enddate}</text>
          <text id="xf">End-time: {this.props.endtime}</text>
        </div>
        <br />
        <Button
          size="small"
          id="bewafa"
          onClick={e => this.handleClick(e, this.props.job_id)}
        >
          edit
        </Button>
      </Paper>
    );
  }
}

export default TestBox;
