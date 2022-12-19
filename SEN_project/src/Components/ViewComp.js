import React from "react";

class ViewComp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h4>{this.props.a}</h4>
        <p>{this.props.b}</p>
      </React.Fragment>
    );
  }
}

export default ViewComp;
