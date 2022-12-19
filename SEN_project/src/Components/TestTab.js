import React from "react";
import TestBox from "./TestBox.js";
import "./JobTab.css";
import axios from "axios";
import Test from "../Test.js";

class TestTab extends React.Component {
  state = {
    tests: [],
    job_id: "",
    test: false
  };

  handleJob = f => {
    this.setState({ test: true, job_id: f });
    console.log(this.state.job_id);
    console.log("jim");
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/viewtest"
    }).then(response => {
      this.setState({ tests: response.data });
      console.log(this.state.tests);
    });
  }

  update = () => {
    this.setState({ test: false });
  };

  render() {
    const data = this.state.tests.map(job => {
      return (
        <div id="box">
          <TestBox
            handleJob={this.handleJob}
            job_id={job.job_id}
            numberofquestions={job.numberofque}
            title={job.title}
            startdate={job.startdate}
            starttime={job.starttime}
            applicants={job.applicants}
            enddate={job.enddate}
            endtime={job.endtime}
          />
        </div>
      );
    });
    if (this.state.test === false) {
      return data;
    } else {
      return (
        <Test
          update={this.update}
          job_id={this.state.job_id}
          que_no={this.props.numberofquestions}
        />
      );
    }
  }
}

export default TestTab;
