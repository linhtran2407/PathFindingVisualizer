import React, { Component } from 'react'
import Node from './Node/Node'
import './PathFindingVisualizer.css'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [], // arrays of nodes for cells in grid
            mouseIsPressed: false,
        }
    }

    componentDidMount() {
        const grid = getInitialGrid()
        this.setState({grid})
    }


    // handleMouseDown(){
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid, mouseIsPressed: true});
    // }

    // handleMouseUp(){

    // }

    render() {
        const {grid, mouseIsPressed} = this.state;
        console.log(grid)

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            return <Node key={nodeIdx} isStart={true} test1={'foo'} test2={'kappa'} mouseIsPressed={mouseIsPressed}></Node>
                        })}
                    </div>
                    )
                })}
            </div>
        )
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };