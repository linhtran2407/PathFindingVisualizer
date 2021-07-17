function Node(id, status) {
    this.id = id
    this.status = status
    this.previousNode =  null
    this.distance = Infinity
    this.object = null
    this.weight = 0
    
}

module.exports = Node