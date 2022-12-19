import React from "react";
import Jobbox from "./Jobbox";
import "./JobTab.css";
import axios from "axios";

class JobTab extends React.Component {
  state = {
    tests: []
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
          />
        </div>
      );
    });

    return data;
  }
}

export default JobTab;
