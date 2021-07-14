// Dijkstra's algorithm: returns *all* nodes in the order in which they were visited. 
// Constantly calculate and update the shortest path at each visit
// Also makes nodes point back to their previous node, effectively allowing us to 
// compute the shortest path by backtracking from the finish node.

export function dijkstra(grid, startNode, finishNode) {
    startNode.distance = 0
    const visitedNodesInOrder = []
    const unvisitedNodes = getAllNodes(grid)

    while(!!unvisitedNodes.length){
        // get the min (closest node) and re-heapify to maintain min-heap structure
        sort(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()

        // skip if meet the wall
        if (closestNode.isWall) continue

        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        // mark as visited and push into the array
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        // if meet the target
        if (closestNode === finishNode){
            return visitedNodesInOrder
        }

        // else update the visited nodes by incrementing the distance of 
        // neighbors node by 1
        updateUnvisitedNeighbors(closestNode, grid)
    }

    return visitedNodesInOrder
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = []
    const {col, row} = node
    // check for validity of each coordinate
    if (row>0) {neighbors.push(grid[row-1][col])}
    if (col>0) {neighbors.push(grid[row][col-1])}
    if (row<grid.length-1) {neighbors.push(grid[row+1][col])}
    if (col<grid[0].length-1) {neighbors.push(grid[row][col+1])}
    return neighbors.filter(nei => !nei.isVisited)
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const nei of unvisitedNeighbors){
        nei.distance = node.distance+1
        nei.previousNode = node
    }
}

function getAllNodes(grid){
    const nodes = []
    for (const row of grid){
        for (const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

function sort(unvisitedNodes) {
    unvisitedNodes.sort((a,b) => a.distance - b.distance)
}

// function dequeue(unvisitedNodes){
//     if (unvisitedNodes.length === 0) {return null}
//     // store and return the min of the heap
//     const min = unvisitedNodes[0]

//     /** re-heapify */ 
//     // pop the last val and set as the new node
//     const end = unvisitedNodes.shift()
//     if (unvisitedNodes.length > 0){
//         unvisitedNodes[0] = end

//         let index = 0
//         const length = unvisitedNodes.length
//         const element = unvisitedNodes[index]

//         while(true){
//             let leftIndex = index*2 + 1
//             let rightIndex = index*2 + 2
//             let rightChild, leftChild
//             let swap = null

//             // check if left child is valid
//             if (leftIndex < length){
//                 // swap if satisfied
//                 leftChild = unvisitedNodes[leftIndex]
//                 if(element.distance > leftChild.distance){
//                     swap = leftIndex
//                 }
//             }

//             // check if right child is valid
//             if (rightIndex < length){
//                 rightChild = unvisitedNodes[rightIndex]
//                 // if no swap made and right child is less prioritized than the current node
//                 // or there is a swap but the right is less prioritized than the left
//                 if ((swap === null && element.distance > rightChild.distance) || 
//                     (swap !== null && rightChild.distance < leftChild.distance)){
//                     swap = rightIndex
//                 }
//             }

//             // stopping condition: when there is no swap could be made
//             if (swap === null) break
//             // else swap
//             unvisitedNodes[index] = unvisitedNodes[swap]
//             unvisitedNodes[swap] = element

//             // update index to continue checking
//             index = swap
//         }
//     }

//     return min
// }

// function enqueue(nodes, node) {
//     nodes.push(node)

//     // store the new node's index and value
//     let index = nodes.length-1
//     const element = nodes[index]

//     while(index>0){
//         // store the new node's parent's index and value
//         const parentIndex = Math.floor((index+1)/2)
//         const parent = nodes[parentIndex]

//         // compare distance then heapify
//         // if found the correct place, break
//         if (element.distance >= parent.distance){break}
//         // else swap parent and new node
//         nodes[index] = parent
//         nodes[parentIndex] = element
//         // update the index to continue heapifying
//         index = parentIndex
//     }
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = []
    let current = finishNode
    while(current !== null){
        nodesInShortestPathOrder.push(current)
        current = current.previousNode
    }

    return nodesInShortestPathOrder
}
