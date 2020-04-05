import React, { Component } from "react";
import PropTypes from "prop-types";

import { breadthSearch } from "./SearchAlgos";

import Tile from "./Tile";

export default class Grid extends Component {
  state = {
    gridTiles: [],
    columns: 80,
    rows: 50,
    startCell: [],
    moveCount: 0,
    reachedEnd: false,
    fastestMoves: [],
    percentRandomWalls: 0.4,
  };

  componentDidMount() {
    this.createNewGrid();
  }

  // Functions

  mainGrid = () => {
    const size = (80 / this.state.columns).toString() + "vw";
    const rows = "repeat(" + this.state.rows.toString() + ", " + size + ")";
    const cols = "repeat(" + this.state.columns.toString() + ", " + size + ")";
    return {
      position: "relative",
      display: "grid",
      gridTemplateRows: rows,
      gridTemplateColumns: cols,
      width: "80vw",
      margin: "auto",
    };
  };

  createNewGrid = function () {
    let numberOfTiles = this.state.columns * this.state.rows;
    let gridData = [];
    let startCell = [];
    let startTile = Math.round(Math.random() * numberOfTiles);
    let endTile = Math.round(Math.random() * numberOfTiles);
    let i = 0;
    for (let r = 0; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.columns; c++) {
        let tileType = "empty";
        if (startTile === i) {
          tileType = "start";
          let placeholder = {
            id: i,
            col: c,
            row: r,
            type: tileType,
            moves: [],
          };
          startCell.push(placeholder);
          this.setState({
            startCell: startCell,
          });
        } else if (endTile === i) {
          tileType = "end";
        }
        let data = { id: i, col: c, row: r, type: tileType, moves: [] };
        gridData.push(data);
        i += 1;
      }
    }
    this.setState({
      gridTiles: gridData,
    });
  };

  createWall = (id) => {
    this.setState({
      gridTiles: this.state.gridTiles.map((tile) => {
        if (tile.id === id) {
          tile.type = tile.type === "empty" ? "wall" : "empty";
        }
        return tile;
      }),
    });
  };

  makeWalls = function () {
    const numOfWalls =
      this.state.rows * this.state.columns * this.state.percentRandomWalls;

    for (let i = 0; i < numOfWalls; i++) {
      this.findNewWall();
    }
  };

  findNewWall = function () {
    let tileId = Math.floor(
      Math.random() * this.state.rows * this.state.columns
    );
    let newWall = this.state.gridTiles.filter(function (tile) {
      return tile.id === tileId;
    });
    if (
      newWall[0].type !== "wall" &&
      newWall[0].type !== "start" &&
      newWall[0].type !== "end"
    ) {
      let foundIndex = this.state.gridTiles.findIndex(
        (x) => x.id === newWall[0].id
      );
      let newGrid = this.state.gridTiles;
      newGrid[foundIndex].type = "wall";
      this.setState({
        gridTiles: newGrid,
      });
    } else {
      this.findNewWall();
    }
  };

  findPath = function (newTiles) {
    if (this.state.reachedEnd === true) {
      const moveLength = this.state.fastestMoves.length;
      console.log(this.state.fastestMoves);
      for (let m = 0; m < moveLength; m++) {
        let moveId = this.state.fastestMoves[m];
        let traveledTile = this.state.gridTiles.filter(function (tile) {
          return tile.id === moveId;
        });
        let foundIndex = this.state.gridTiles.findIndex(
          (x) => x.id === traveledTile[0].id
        );
        let newGrid = this.state.gridTiles;
        newGrid[foundIndex].type = "fastPath";
        setTimeout(() => {
          this.setState({
            gridTiles: newGrid,
          });
        }, 200);
      }
      console.log("Found Path in " + this.state.moveCount + " steps!");
      console.log(this.state.fastestMoves);
    } else if (newTiles.length === 0) {
      console.log("No More Moves!");
    } else {
      let newTilesLength = newTiles.length;
      let tilesFromSearch = [];
      for (let i = 0; i < newTilesLength; i++) {
        let search = breadthSearch(
          newTiles[i],
          this.state.rows,
          this.state.columns,
          this.state.gridTiles
        );
        this.setState({
          reachedEnd: search.reachedEnd,
          gridTiles: search.grid,
          fastestMoves: search.fastestMoves,
        });
        if (search.reachedEnd === true) {
          break;
        }
        tilesFromSearch = tilesFromSearch.concat(search.newTiles);
      }
      let placholderMoveCount = this.state.moveCount + 1;
      this.setState({
        moveCount: placholderMoveCount,
      });
      setTimeout(() => {
        this.findPath(tilesFromSearch);
      }, 0);
    }
  };

  // Render

  render() {
    return (
      <div>
        <input
          type="button"
          value="Random Walls"
          onMouseDown={this.makeWalls.bind(this)}
        />
        <input
          type="button"
          value="Run"
          onMouseDown={this.findPath.bind(this, this.state.startCell)}
        />
        <div style={this.mainGrid()}>
          {this.state.gridTiles.map((tile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              tileType={tile.type}
              numCols={this.state.columns}
              createWall={this.createWall}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Styles
