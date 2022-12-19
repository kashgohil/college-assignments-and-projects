import React from "react";
import axios from "axios";
import ViewComp from "./ViewComp.js";
class ViewJob extends React.Component {
  componentDidMount() {
    console.log(this.props.job_id);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/view",
      data: {
        job_id: this.props.job_id
      }
    }).then(response => {
      this.setState({ job: response.data[0] });
      console.log(this.state.job);
    });
  }

  state = {
    job: {}
  };

  render() {
    return (
      <div>
        <h1>{this.state.job.title}</h1>
        <ViewComp a="CPI Criteria" b={this.state.job.cpi} />
        <ViewComp a="Skills" b={this.state.job.skills} />
        <ViewComp a="Experience" b={this.state.job.experience} />
        <ViewComp a="Work" b={this.state.job.work} />
        <ViewComp a="Perks and Benefits" b={this.state.job.perks} />
        <ViewComp a="CPI Weightage" b={this.state.job.wcpi} />
        <ViewComp a="Skills Weightage" b={this.state.job.wskills} />
        <ViewComp a="Experience Weightage" b={this.state.job.wexperience} />
        <ViewComp a="Test Weightage" b={this.state.job.wtest} />
      </div>
    );
  }
}

export default ViewJob;
