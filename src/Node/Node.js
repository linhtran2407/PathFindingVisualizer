// function Node(id, status) {
//     this.id = id
//     this.status = status
//     this.previousNode =  null
//     this.distance = Infinity
//     this.object = null
//     this.weight = 0
    
// }

// module.exports = Node

function Node(id, status) {
    this.id = id;
    this.status = status;
    this.previousNode = null;
    this.distance = Infinity;
    this.weight = 0;
  
    
    this.path = null;
    this.direction = null;
    this.storedDirection = null;
    this.totalDistance = Infinity;
    this.heuristicDistance = null;
    this.relatesToObject = false;
    this.overwriteObjectRelation = false;
  
    this.otherid = id;
    this.otherstatus = status;
    this.otherpreviousNode = null;
    this.otherpath = null;
    this.otherdirection = null;
    this.otherstoredDirection = null;
    this.otherdistance = Infinity;
    this.otherweight = 0;
    this.otherrelatesToObject = false;
    this.otheroverwriteObjectRelation = false;
  }
  
  module.exports = Node;
  