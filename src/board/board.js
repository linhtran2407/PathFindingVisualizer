const Node = require('../Node/Node')
const dijkstra = require('../algorithms/dijkstra')
// import getNodesInShortestPathOrder
// import animation

function Board (height, width){
    this.height = height
    this.width = width
    this.start = null
    this.target = null
    this.object = null
    this.boardArray = []
    this.nodes = {}
    this.mouseDown = false
    this.pressedNodeStatus = "normal" // status of the node when clicked on it
    this.keyDown = false
    this.previouslySwitchedNode = false // ??????
    this.previouslyPressedNodeStatus = null
    this.previouslySwitchedNodeWeight = 0
    this.algoDone = false
    this.currentAlgorithm = null
    this.buttonsOn = false
    this.objectShortestPathNodesToAnimate = []
}

Board.prototype.initialize = function () {
    this.createGrid()
    this.addEventListener()
}

Board.prototype.createGrid = function () {
    let tableHTML = ""
    for (let r=0; r<this.height; r++){
        let currArrayRow = []
        let currHTMLRow = `<tr id="row ${r}">`
        for (let c=0; c<this.width; c++){

            // create new node
            let newNodeId = `${r}-${c}`, newNodeClass, newNode
            // initialize default start node
            if (r === Math.floor(this.height/2) && c === Math.floor(this.width/4)){
                newNodeClass = 'start' // class (type) of the node
                this.start = `${newNodeId}`
            // initialize default target node
            } else if (r === Math.floor(this.height/2) && c === Math.floor(this.width)/4*3){
                newNodeClass = 'target'
                this.target = `${newNodeId}`
            // other than those above 2 nodes, mark all others as unvisited
            } else {
                newNodeClass = 'unvisited'
            }

            // push each new node to the row
            newNode = new Node(newNodeId, newNodeClass)
            currArrayRow.push(newNode)
            currHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`
        }

        // push the whole row to the table
        this.boardArray.push(currArrayRow)
        tableHTML += `${currentHTMLRow}</tr>`
    }


    // ???????
    let board = document.getElementById("board")
    board.innerHTML = tableHTML
}

Board.prototype.addEventListener = function () {
    // ???????
    let board = this

    for (let r=0; r<board.height; r++){
        for (let c=0; c<board.width; c++){
            let currId = `${r}-${c}`
            let currNode = board.getNode(currId)
            let currElement = document.getElementById(currId)

            currElement.onmousedown = (e) => {
                e.preventDefault()
                if(this.buttonsOn) {
                    board.mouseDown = true

                    // ?????
                    if (currNode.status === 'start' || currNode.status === 'target' || currNode.status === 'object'){
                        board.pressedNodeStatus = currNode.status
                    } else {
                        board.pressedNodeStatus = "normal"
                        board.changeNormalNode(currNode)
                    }
                }
            }

            currElement.onmouseup = () => {
                if (this.buttonsOn){
                    board.mouseDown = false

                    // set new start/target/object node if click on the node
                    if (board.pressedNodeStatus === 'start'){
                        board.start = currId
                    } else if (board.pressedNodeStatus === 'target'){
                        board.target = currId
                    } else if (board.pressedNodeStatus === 'object'){
                        board.object = currId
                    }
                    // reset back to normal
                    board.pressedNodeStatus = "normal"
                }
            }

            // enter means hover to that node on the grid
            currElement.onmouseenter = () => {
                if (this.buttonsOn){
                    // if mouse down while entering the node
                    // and the node's status is either target, start, or object
                    if (board.mouseDown && board.pressedNodeStatus !== "normal"){
                        board.changeSpecialNode(currNode)
                        if (board.pressedNodeStatus === "start"){
                            board.start = currId
                            // if (board.algoDone){
                            //     board.redoAlgorithm()
                            // }
                        } else if (board.pressedNodeStatus === "target"){
                            board.target = currId
                            // if (board.algoDone){
                            //     board.redoAlgorithm()
                            // }
                        } else if (board.pressedNodeStatus === "object"){
                            board.object = currId
                            // if (board.algoDone){
                            //     board.redoAlgorithm()
                            // }
                        }

                    // if the mouse down while entering a normal node
                    } else if (board.mouseDown){
                        board.changeNormalNode(currNode)
                    }
                }
            }

            currElement.onmouseleave = () => {
                if(this.buttonsOn){
                    if(board.mouseDown && board.pressedNodeStatus !== "normal"){
                        board.changeSpecialNode(currNode)
                    }
                }
            }
        }
    }
}

Board.prototype.getNode = function(id) {
    let coordinates = id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
    return this.boardArray[r][c];
};

Board.prototype.changeNormalNode = function (currNode) {
    let element = document.getElementById(currNode.id)
    let statuses = ["start", "target", "object"]
    
    let unweightedAlgorithms = ["dfs", "bfs"]

    if (!this.keyDown){
        if (!statuses.includes(currNode.status)){

            // ????
            element.className = currNode.status !== 'wall'? 'wall' : 'unvisited'
            currNode.status = element.className !== 'wall'? 'unvisited' : 'wall'
            currNode.weight = 0
        }

        // ????
    } else if (this.keyDown === 87 && !unweightedAlgorithms.includes(this.currentAlgorithm)) {
        if (!relevantStatuses.includes(currentNode.status)) {
            element.className = currentNode.weight !== 15? "unvisited weight" : "unvisited"
            currentNode.weight = element.className !== "unvisited weight"? 0 : 15;
            currentNode.status = "unvisited"
        }
    }
}

// ?????
Board.prototype.changeSpecialNode = function (currNode) {
    let element = document.getElementById(currNode.id), previousElement
    if (this.previouslySwitchedNode){
        previousElement = document.getElementById(this.previouslySwitchedNode.id)
    }
    if (currNode.status !== "target" && currNode !== "start" && currNode !== "object"){
        if (this.previouslySwitchedNode){
            this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus
            previousElement.className = this.previouslySwitchedNodeWeight === 15? "unvisited weight" : this.previouslyPressedNodeStatus
            this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15? 15:0
            this.previouslySwitchedNode = null
            this.previouslySwitchedNodeWeight = currNode.weight
            this.previouslyPressedNodeStatus = currNode.status

            element.className = this.pressedNodeStatus
            currNode.status = this.pressedNodeStatus
            currNode.weight = 0
        }
    } else if (currNode.status !== this.pressedNodeStatus && !this.algoDone){
        this.previouslySwitchedNode.status = this.pressedNodeStatus
        previousElement.className = this.pressedNodeStatus
    } else if (currNode.status === this.pressedNodeStatus) {
        this.previouslySwitchedNode = currNode

        element.className = this.previouslyPressedNodeStatus
        currNode.status = this.previouslyPressedNodeStatus
    }
}

Board.prototype.drawShortestPath = function (targetNodeId, startNodeId, object) {
    let currNode
    if (this.currentAlgorithm !== "bidirectional"){
        // backtrack by using prev node
        currNode = this.nodes[this.nodes[targetNodeId].previousNode]
        if (object){
            while(currNode.id !== startNodeId){
                this.objectShortestPathNodesToAnimate.unshift(currNode)
                // update current node to be the prev node to continue backtracking to
                // start node
                currNode = this.nodes[currNode.previousNode]
            }
        } else {
            while (currNode.id !== startNodeId){
                this.shortestPathNodesToAnimate.unshift(currNode)
                currNode = this.nodes[currNode.previousNode]
            }
        }
    }
}

Board.prototype.drawShortestPath = function(targetNodeId, startNodeId, object) {
    let currentNode;
    if (this.currentAlgorithm !== "bidirectional") {
      currentNode = this.nodes[this.nodes[targetNodeId].previousNode];
      if (object) {
        while (currentNode.id !== startNodeId) {
          this.objectShortestPathNodesToAnimate.unshift(currentNode);
          currentNode = this.nodes[currentNode.previousNode];
        }
      } else {
        while (currentNode.id !== startNodeId) {
          this.shortestPathNodesToAnimate.unshift(currentNode);
          document.getElementById(currentNode.id).className = `shortest-path`;
          currentNode = this.nodes[currentNode.previousNode];
        }
      }
    }

    // } else {
    //   if (this.middleNode !== this.target && this.middleNode !== this.start) {
    //     currentNode = this.nodes[this.nodes[this.middleNode].previousNode];
    //     secondCurrentNode = this.nodes[this.nodes[this.middleNode].otherpreviousNode];
    //     if (secondCurrentNode.id === this.target) {
    //       this.nodes[this.target].direction = getDistance(this.nodes[this.middleNode], this.nodes[this.target])[2];
    //     }
    //     if (this.nodes[this.middleNode].weight === 0) {
    //       document.getElementById(this.middleNode).className = `shortest-path`;
    //     } else {
    //       document.getElementById(this.middleNode).className = `shortest-path weight`;
    //     }
    //     while (currentNode.id !== startNodeId) {
    //       this.shortestPathNodesToAnimate.unshift(currentNode);
    //       document.getElementById(currentNode.id).className = `shortest-path`;
    //       currentNode = this.nodes[currentNode.previousNode];
    //     }
    //     while (secondCurrentNode.id !== targetNodeId) {
    //       this.shortestPathNodesToAnimate.unshift(secondCurrentNode);
    //       document.getElementById(secondCurrentNode.id).className = `shortest-path`;
    //       if (secondCurrentNode.otherpreviousNode === targetNodeId) {
    //         if (secondCurrentNode.otherdirection === "left") {
    //           secondCurrentNode.direction = "right";
    //         } else if (secondCurrentNode.otherdirection === "right") {
    //           secondCurrentNode.direction = "left";
    //         } else if (secondCurrentNode.otherdirection === "up") {
    //           secondCurrentNode.direction = "down";
    //         } else if (secondCurrentNode.otherdirection === "down") {
    //           secondCurrentNode.direction = "up";
    //         }
    //         this.nodes[this.target].direction = getDistance(secondCurrentNode, this.nodes[this.target])[2];
    //       }
    //       secondCurrentNode = this.nodes[secondCurrentNode.otherpreviousNode]
    //     }
    //   } else {
    //     document.getElementById(this.nodes[this.target].previousNode).className = `shortest-path`;
    //   }
    // }
}


// import React, { Component } from 'react'
// import Node from '../Node/Node'
// import './board.css'
// import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;

// export default class Board extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             grid: [], // arrays of nodes for cells in grid
//             mouseIsPressed: false, // when press the mouse, used when create wall
//         }
//     }

//     componentDidMount() {
//         const grid = getInitialGrid()
//         this.setState({grid})
//     }

//     // mouse down is when we press, but not release, the mouse
//     // we want the node to be toggled into wall 
//     handleMouseDown(row, col){
//         const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
//         this.setState({grid: newGrid, mouseIsPressed: true})
//     }

//     // enter is when we pressed the mouse already and are hovering
//     // through the grid
//     handleMouseEnter(row, col){
//         // we dont want to toggle every cell into wall when we are hovering 
//         // but not pressing the mouse
//         if (!this.state.mouseIsPressed) {return}

//         const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
//         this.setState({grid: newGrid})
//     }

//     handleMouseUp(){
//         this.setState({mouseIsPressed: false})
//     }

//     animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
//         for (let i=0; i<=visitedNodesInOrder.length; i++){
//             // if reach the finish node, animate the shortest path
//             if (i === visitedNodesInOrder.length){
//                 setTimeout(() => {
//                     this.animateShortestPath(nodesInShortestPathOrder)
//                 }, 10*i);
//                 return
//             }
//             // meanwhile, just show the path
//             setTimeout(() => {
//                 const node = visitedNodesInOrder[i]
//                 document.getElementById(`node-${node.row}-${node.col}`).className =
//                 'node node-visited';
//             }, 10*i);
//         }
//     }

//     animateShortestPath(nodesInShortestPathOrder) {
//         for (let i=0; i<nodesInShortestPathOrder.length; i++){
//         setTimeout(() => {
//             const node = nodesInShortestPathOrder[i]
//             document.getElementById(`node-${node.row}-${node.col}`).className =
//           'node node-shortest-path';
//         }, 35 * i);
//         }
//     }

//     visualizeDijkstra() {
//         const {grid} = this.state
//         const startNode = grid[START_NODE_ROW][START_NODE_COL]
//         const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
//         const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
//         const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
//         this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
//     }

//     render() {
//         const {grid, mouseIsPressed} = this.state;

//         return (
//             <>
//             <button onClick={() => this.visualizeDijkstra()}>
//             Visualize Dijkstra's Algorithm
//             </button>
//             <div className="grid">
//                 {grid.map((row, rowIdx) => {
//                     return (
//                     <div key={rowIdx}>
//                         {row.map((node, nodeIdx) => {
//                             const {row, col, isFinish, isStart, isWall} = node;
//                             return (<Node
//                             key={nodeIdx}
//                             col={col}
//                             isStart={isStart}
//                             isFinish={isFinish}
//                             isWall={isWall}
//                             onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
//                             onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
//                             onMouseUp = {(row, col) => this.handleMouseUp(row, col)}
//                             mouseIsPressed={mouseIsPressed}
//                             row={row}></Node>)
//                         })}
//                     </div>
//                     )
//                 })}
//             </div>
//             </>
//         )
//     }
// }

// const getInitialGrid = () => {
//     const grid = [];
//     for (let row = 0; row < 20; row++) {
//       const currentRow = [];
//       for (let col = 0; col < 50; col++) {
//         currentRow.push(createNode(col, row));
//       }
//       grid.push(currentRow);
//     }
//     return grid;
// };


// const createNode = (col, row) => {
//     return {
//       col,
//       row,
//       isStart: row === START_NODE_ROW && col === START_NODE_COL,
//       isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//       distance: Infinity,
//       isVisited: false,
//       isWall: false,
//       previousNode: null,
//     };
// };


// // toggle the grid into a wall
// const getNewGridWithWallToggled = (grid, row, col) => {
//     const newGrid = grid.slice()
//     const node = newGrid[row][col]
//     const newNode = {
//         ...node,
//         isWall: !node.isWall
//     }

//     newGrid[row][col] = newNode
//     return newGrid
// }