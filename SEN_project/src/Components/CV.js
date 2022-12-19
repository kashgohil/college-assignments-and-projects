import React from "react";
import Button from "@material-ui/core/Button";
import "./CV.css";

class CV extends React.Component {
  render() {
    return (
      <div id="hello">
        <Button variant="contained" color="primary" id="cv">
          Upload CV
        </Button>
        <br />
        <Button variant="contained" color="primary" id="cv">
          Download CV
        </Button>
      </div>
    );
  }
}

export default CV;
