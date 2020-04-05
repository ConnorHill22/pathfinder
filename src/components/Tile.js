import React, { Component } from "react";
import Grid from "./Grid";

export default class Tile extends Component {
  getStyle = () => {
    let bgColor = "#FFFFFF";
    if (this.props.tileType === "wall") {
      bgColor = "#181818";
    }
    const colWidth = (100 / this.props.numCols).toString() + "%";
    return {
      background: bgColor,
      border: "solid 1px #000000",
      width: "100%",
      //   paddingBottom: "" /* Same as width, sets height */,
      //   marginBottom: '2%', /* (100-32*3)/2 */
      position: "relative",
    };
  };

  getCircleStyle = () => {
    let circleColor = "#FFFFFF";
    let circleDisplay = "none";
    if (this.props.tileType === "start") {
      circleDisplay = "inline-block";
      circleColor = "#19a600";
    } else if (this.props.tileType === "end") {
      circleDisplay = "inline-block";
      circleColor = "#a81008";
    } else if (this.props.tileType === "travled") {
      circleDisplay = "inline-block";
      circleColor = "#03c6fc";
    } else if (this.props.tileType === "fastPath") {
      circleDisplay = "inline-block";
      circleColor = "#f0fc00";
    }
    return {
      position: "absolute",
      justifySelf: "center",
      alignSelf: "center",
      height: "80%",
      width: "80%",
      display: circleDisplay,
      borderRadius: "50%",
      backgroundColor: circleColor,
    };
  };

  render() {
    const id = this.props.id;
    return (
      <div
        style={this.getStyle()}
        onMouseDown={this.props.createWall.bind(this, id)}
      >
        <div style={insideTile}>
          <div style={this.getCircleStyle()}></div>
        </div>
      </div>
    );
  }
}

// Styles
const insideTile = {
  margin: "auto",
  position: "absolute",
  display: "grid",
  width: "100%",
  height: "100%",
};

// Prop Types
