import React, { Component } from 'react'
import Node from '../Node/Node'
import './board.css'
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [], // arrays of nodes for cells in grid
            mouseIsPressed: false, // when press the mouse, used when create wall
        }
    }

    componentDidMount() {
        const grid = getInitialGrid()
        this.setState({grid})
    }

    // mouse down is when we press, but not release, the mouse
    // we want the node to be toggled into wall 
    handleMouseDown(row, col){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid, mouseIsPressed: true})
    }

    // enter is when we pressed the mouse already and are hovering
    // through the grid
    handleMouseEnter(row, col){
        // we dont want to toggle every cell into wall when we are hovering 
        // but not pressing the mouse
        if (!this.state.mouseIsPressed) {return}

        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid})
    }

    handleMouseUp(){
        this.setState({mouseIsPressed: false})
    }


    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i=0; i<=visitedNodesInOrder.length; i++){
            // if reach the finish node, animate the shortest path
            if (i === visitedNodesInOrder.length){
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder)
                }, 10*i);
                return
            }
            // meanwhile, just show the path
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }, 10*i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i=0; i<nodesInShortestPathOrder.length; i++){
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i]
            document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
        }, 35 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    render() {
        const {grid, mouseIsPressed} = this.state;

        return (
            <>
            <button onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {row, col, isFinish, isStart, isWall} = node;
                            return (<Node
                            key={nodeIdx}
                            col={col}
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                            onMouseUp = {(row, col) => this.handleMouseUp(row, col)}
                            mouseIsPressed={mouseIsPressed}
                            row={row}></Node>)
                        })}
                    </div>
                    )
                })}
            </div>
            </>
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


// toggle the grid into a wall
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall: !node.isWall
    }

    newGrid[row][col] = newNode
    return newGrid
}