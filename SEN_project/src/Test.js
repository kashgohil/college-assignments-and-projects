import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import LoginForm from "./QuestionForm";
import "./Test.css";
import ViewQuestion from "./ViewQuestion";
import axios from "axios";
import { isNull } from "util";

class Test extends React.Component {
  state = {
    open1: false,
    open2: false,
    questions: [],
    job_id: ""
  };

  handleOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/viewtestque",
      data: {
        job_id: this.props.job_id
      }
    }).then(response => {
      this.setState({ questions: response.data });
    });
  };

  componentDidMount() {
    this.setState({ job_id: this.props.job_id });
    const a = this.props.job_id;
    console.log(a);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/viewtestque",
      data: {
        job_id: this.props.job_id
      }
    }).then(response => {
      this.setState({ questions: response.data });
    });
  }
  render() {
    let data=[];
    if(isNull(this.state.questions)=== false){
    data = this.state.questions.map(job => {
      return (
        <div id="box">
          <ViewQuestion
            que={job.question}
            o1={job.option_a}
            o2={job.option_b}
            o3={job.option_c}
            o4={job.option_d}
            ans={job.right_answer}
          />
        </div>
      );
    });
    return (
      <div>
        <h2>Test</h2>
        <div id="itis">
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.update}
            fullWidth
          >
            save test
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOpen1}
            fullWidth
          >
            Add Question
          </Button>
        </div>
        <div id="nope">{data}</div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open1}
          onClose={this.handleClose1}
        >
          <div>
            <Paper id="how">
              <div id="why">
                <LoginForm
                  job_id={this.state.job_id}
                  que_no={this.props.que_no}
                />
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    );}
    else
    {
      return <p> hello</p>;
    }
  }
}

export default Test;
