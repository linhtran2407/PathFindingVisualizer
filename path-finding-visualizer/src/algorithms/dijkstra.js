// Dijkstra's algorithm: returns *all* nodes in the order in which they were visited. 
// Constantly calculate and update the shortest path at each visit
// Also makes nodes point back to their previous node, effectively allowing us to 
// compute the shortest path by backtracking from the finish node.

/**
 * 
 1. Assign all vertices a tentative distance value: set it to 0 for our start vertex (since we've already reached it) and 
 Infinity for all other vertices (since at this point they seem unreachable to us).

2. Create a set of visited vertices. We will use it to avoid endless loops while traversing the vertices.

3. Create a vertex visiting queue and put the starting vertex to this queue. We will use priority queue with distance to the 
vertex as a priority factor (priority is explained in one of the previous chapters). The shorter the vertex distance to the 
starting vertex the higher its priority.

4. Poll the next closest vertex from the queue (the vertex with smaller distance from the source). 
Priority queue will allow us to do it.

5. Go through every unvisited neighbor of the current vertex. For each neighbor calculate distanceToTheCurrentVertex + distanceFromCurrentVertexToNeighbor. If this distance is less than neighbor's tentative distance then replace it with this new value.

6. When we're done considering all the neighbors of the current vertex, mark current vertex as visited.

7. Go to step 4 and repeat it until the vertex visiting queue is empty.
 */

/**
1  function Dijkstra(Graph, source):
2      dist[source] ← 0                           // Initialization
3
4      create vertex priority queue Q
5
6      for each vertex v in Graph:          
7          if v ≠ source
8              dist[v] ← INFINITY                 // Unknown distance from source to v
9              prev[v] ← UNDEFINED                // Predecessor of v
10
11         Q.add_with_priority(v, dist[v])
12
13
14     while Q is not empty:                      // The main loop
15         u ← Q.extract_min()                    // Remove and return best vertex
16         for each neighbor v of u:              // only v that are still in Q
17             alt ← dist[u] + length(u, v)
18             if alt < dist[v]
19                 dist[v] ← alt
20                 prev[v] ← u
21                 Q.decrease_priority(v, alt)
22
23     return dist, prev
 */

// min heap implementation using array
class PriorityQueue{
    constructor() {
        this.value = []
    }

    enqueue(value, priority) {
        // create new node and push into the heap
        let newNode = new Node(value, priority)
        this.value.push(newNode)

        // store the new node's index and value
        const index = this.value.length()-1
        const element = this.value[index]

        while(index>0){
            // store the new node's parent's index and value
            const parentIndex = Math.floor((index+1)/2)
            const parent = this.value[parentIndex]
        }
    }
}

class Node{
    constructor(value, priority) {
        this.value = value
        this.priority = priority
    }
}

function dijkstra(Graph, source) {
    const dist = []

}