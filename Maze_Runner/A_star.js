// AStar stuff
// Function to delete element from the array
function removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }
  
  // An educated guess of how far it is between two points
  function heuristic(a, b) {
    // let d = dist(a.i, a.j, b.i, b.j);
    let d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  }
  
// The road taken
let path = [];
  
  function astar() {
    // Am I still searching?
    while(openSet.length > 0) {

      // Best next option
      let winner = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }

      let current = openSet[winner];
      // Did I finish?
      if (current === end) {
        mazze = true
        console.log("DONE!");
        return ;
      }
  
      // Best option moves from openSet to closedSet
      removeFromArray(openSet, current);
      closedSet.push(current);
  
      // Check all the neighbors
      let neighbors = current.getOptions();
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        // Valid next spot?
        if (!closedSet.includes(neighbor)) {
          let tempG = current.g + heuristic(neighbor, current);

          // Is this a better path than before?
          let newPath = false;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
  
          // Yes, it's a better path
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
      // Uh oh, no solution
      console.log("NO SOLUTION");
      mazze = false;
    }
}