// useful info:
// https://www.gamasutra.com/view/feature/132330/the_pacman_dossier.php
// https://gameinternals.com/understanding-pac-man-ghost-behavior


function init() {

  // ! FUNCTIONS
  
  // menuload
    // display UI for start game - button with event listener
    // get current high score from localStorage and display

  // start game
    // display current score
    // build arena
    // start update loop

  // end game
    // check if new high score
      // if yes, update localStorage
    // remove all ghosts
    // stop update loop
    // remove player
    // remove arena
    // run menuload
  
  const gridWidth = 28
  const gridHeight = 36
  const cellCount = gridWidth * gridHeight
  const cellMap = []
  const stageOne = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,1,1,1,2,2,1,1,1,1,0,1,0,1,0,0,0,0,0,
    1,1,1,1,1,1,0,1,0,1,2,2,2,2,2,2,2,2,1,0,1,0,1,1,1,1,1,1,
    4,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,4,
    1,1,1,1,1,1,0,1,0,1,2,2,2,2,2,2,2,2,1,0,1,0,1,1,1,1,1,1,
    0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,
    1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,1,0,0,0,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  function buildArena(stage) {
    console.log('Building arena')
    // create grid of cells
    const grid = document.getElementById('game-grid')
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      // check current stage map
      if (stage[i] === 1) {
        // make edges of grid into walls
        cell.classList.add('wall')
      } else if (stage[i] === 3) {
        // place player
        cell.classList.add('player')
      } else if (stage[i] === 2) {
        // set up ghost house
        cell.classList.add('ghost-house')
      } else if (stage[i] === 4) {
        // set up teleport zones
        cell.classList.add('teleport-zone')
      }
      cellMap.push(cell)
      grid.appendChild(cell)
    }
  }

  buildArena(stageOne)

  // buildArena
    
    // place walls and empty squares
    // place powerups
    // place pellets
    // set player start location
    // place player
    // place ghosts

  // update
    // // every 10ms*
    // on move
      // check for collisions
        // if collision between player in normal state and ghost
          // player dies
        // if collision between player in super state and ghost
          // ghost dies
        // if collision between player and pellet
          // increment score
          // rid of pellet
        // if collision between player and powerup
          // player enters super state
          // ghosts enter afraid state
      // check number of pellets left
        // if 10 gone, spawn first ghost
        // if 30 gone, spawn second ghost
        // if 60 gone, spawn third ghost
        // if none, game over (or go to next level?)
      // update ghost manager
        // run each ghost pathfinder
        // update target position

    // pathfinder(currentLocation, playerLocation)
      // maybe one pathfinder per ghost?
      // a* stuff here: https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2

      // A* (star) Pathfinding
      // ? Initialize both open and closed list
      // let the openList equal empty list of nodes
      // let the closedList equal empty list of nodes
      // ? Add the start node
      // put the startNode on the openList (leave it's f at zero)
      // ? Loop until you find the end
      // while the openList is not empty
      //     ? Get the current node
      //     let the currentNode equal the node with the least f value
      //     remove the currentNode from the openList
      //     add the currentNode to the closedList
      //     ? Found the goal
      //     if currentNode is the goal
      //         Congratz! You've found the end! Backtrack to get path
      //     ? Generate children
      //     let the children of the currentNode equal the adjacent nodes
          
      //     for each child in the children
      //         ? Child is on the closedList
      //         if child is in the closedList
      //             continue to beginning of for loop
      //         ? Create the f, g, and h values
      //         child.g = currentNode.g + distance between child and current
      //         child.h = distance from child to end
      //         child.f = child.g + child.h
      //         ? Child is already in openList
      //         if child.position is in the openList's nodes positions
      //             if the child.g is higher than the openList node's g
      //                 continue to beginning of for loop
      //         ? Add the child to the openList
      //         add the child to the openList

  // ! OBJECTS

  // game manager
    // bool game started
    // current score
    // high score

  // player manager
    // player current location
    // bool super state
    // input listener
      // if not trying to move outside of arena
      // and not trying to move into a wall
      // move player

  // ghost manager
    // blinky current position
    // blinky target position - player position
    // bool blinky active state
    // bool scared state

    // pinky current position
    // pinky target position
    // bool pinky active state
    // inky current position
    // inky target position
    // bool inky active state
    // clyde current position
    // clyde target position
    // bool clyde active state
}

window.addEventListener('DOMContentLoaded', init)
