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
import Modal from "@material-ui/core/Modal";
import ViewJob from "./ViewJob.js";
import JobForm from "../JobForm.js";
import axios from "axios";
import Analyze from "./Analyze.js"

class Jobbox extends React.Component {
  state = {
    open1: false,
    open2: false,
    open3: false,
    job: true
  };

  handleOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };

  handleOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleOpen3 = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/analyze",
      data: {
        job_id: this.props.job_id
      }
    });
    this.setState({ open3: true });
  };

  handleClose3 = () => {
    this.setState({ open3: false });
  };

  handleOpen4 = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/delete",
      data: {
        job_id: this.props.job_id
      }
    }).then(response => {
      this.props.handleNew();
    });
  };

  render() {
    return (
      <div>
        <Paper>
          <h3 id="mn">{this.props.title}</h3>
          <div id="no">
            <text id="ab">Added on: {this.props.addedon}</text>
            <text id="cd">Deadline: {this.props.deadline}</text>
            <text id="ef">Applicants: {this.props.applicants}</text>
          </div>
          <br />
          <div id="gh">
            <Button size="small" onClick={this.handleOpen4}>
              delete
            </Button>
            <Button size="small" onClick={this.handleOpen1}>
              view
            </Button>
            <Button size="small" onClick={this.handleOpen2}>
              edit
            </Button>
            <Button size="small" onClick={this.handleOpen3}>
              analyze
            </Button>
          </div>
        </Paper>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open1}
          onClose={this.handleClose1}
          id="whythis"
        >
          <Paper id="viewmodal">
            <div id="viewmodalid">
              <ViewJob job_id={this.props.job_id} />
            </div>
          </Paper>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open2}
          onClose={this.handleClose2}
          id="whythis"
        >
          <div>
            <Paper id="viewmodal">
              <div id="viewmodalnext">
                <JobForm />
              </div>
            </Paper>
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open3}
          onClose={this.handleClose3}
          id="whythis"
        >
          <div>
            <Paper id="detailmodal">
              <div id="yash" />
              <Analyze job_id={this.props.job_id}/>
              <div />
            </Paper>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Jobbox;
