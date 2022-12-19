import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "./List.js";
import "./Dashboard.css";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import LoginForm from "./LoginForm.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

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
      <div>
        <div>
          <AppBar position="static" backgroundColor="black">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Analyx
              </Typography>
              <div id="butt">
                <Button color="inherit">Logout</Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <List />
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open1}
          onClose={this.handleClose1}
        >
          <div>
            <Paper id="postajob">
              <div id="postjob">
                <LoginForm />
              </div>
            </Paper>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
