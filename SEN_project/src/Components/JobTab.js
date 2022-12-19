import React from "react";
import Jobbox from "./Jobbox";
import "./JobTab.css";
import axios from "axios";
import { isNull } from "util";

class JobTab extends React.Component {
  state = {
    jobs: [],
    nojobs: true
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/jobs"
    }).then(response => {
      this.setState({ jobs: response.data });
      if (response.data === null) {
        this.setState({ nojobs: true });
      } else {
        this.setState({ nojobs: false });
      }
    });
  }

  handleNew = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/jobs"
    }).then(response => {
      this.setState({ jobs: response.data });
      if (isNull(response.data)) {
        this.setState({ nojobs: true });
      } else {
        this.setState({ nojobs: false });
      }
    });
  };

  render() {
    const data = this.state.jobs.map(job => {
      return (
        <div id="box">
          <Jobbox
            job_id={job.job_id}
            title={job.title}
            addedon={job.addedon}
            deadline={job.deadline}
            applicants={job.applicants}
            handleNew={this.handleNew}
          />
        </div>
      );
    });
    return data;
  }
}

export default JobTab;
