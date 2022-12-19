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

class Appbox extends React.Component {
  handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  render() {
    return (
      <Paper>
        <h3 id="mn">Software Engineer</h3>
        <div id="no">
          <text id="ab">Added on: 14/04/2018</text>
          <text id="cd">Deadline: 16/05/2018</text>
          <text id="ef">Salary: $10k</text>
        </div>
        <br />
        <Button size="small" id="gh">
          view
        </Button>
      </Paper>
    );
  }
}

export default Appbox;
