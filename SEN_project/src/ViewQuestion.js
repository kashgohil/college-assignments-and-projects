import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import LoginForm from "./QuestionForm";
import "./ViewQuestion.css";

class ViewQuestion extends React.Component {
  state = {
    open1: false,
    open2: false
  };

  handleOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };

  render() {
    return (
      <div id="lol">
        <Paper id="lol">
          <div id="notnow">
            <h3>{this.props.que}</h3>
            <p>A. {this.props.o1}</p>
            <p>B. {this.props.o2}</p>
            <p>C. {this.props.o3}</p>
            <p>D. {this.props.o4}</p>
            <p>Answer: {this.props.ans}</p>
            <div id="job">
              <Button size="small" onClick={this.handleOpen1}>
                edit
              </Button>
              <Button size="small" onClick={this.handleOpen1}>
                delete
              </Button>
            </div>
          </div>
        </Paper>

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
                  que={this.props.que}
                  o1={this.props.o1}
                  o2={this.props.o2}
                  o3={this.props.o3}
                  o4={this.props.o4}
                  ans={this.props.ans}
                />
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewQuestion;
