import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import "./Profile.css";
import DetailsForm from "./DetailsForm";

class Profile extends React.Component {
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

  handleOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  render() {
    return (
      <div>
        <Paper elevation={1} id="hello">
          <p id="hi">Name: Yash Jogi</p>
          <p id="hi">Emailid: yashjogi1999@gmail.com</p>
          <Button
            id="one"
            variant="contained"
            color="primary"
            onClick={this.handleOpen1}
          >
            Change details
          </Button>
          <br />
          <Button
            id="two"
            variant="contained"
            color="primary"
            onClick={this.handleOpen2}
          >
            Change Password
          </Button>
          <br />
          <Button
            id="three"
            variant="contained"
            color="primary"
            onClick={this.handleOpen2}
          >
            Verify Emailid
          </Button>
        </Paper>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open2}
          onClose={this.handleClose2}
        >
          <div>
            <Paper id="passwordmodal">
              <div id="yash">
                <DetailsForm />
              </div>
            </Paper>
          </div>
        </Modal>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open1}
          onClose={this.handleClose1}
        >
          <div>
            <Paper id="detailmodal">
              <div id="yash">
                <DetailsForm />
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Profile;
