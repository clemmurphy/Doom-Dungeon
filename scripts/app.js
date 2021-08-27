// useful info:
// https://www.gamasutra.com/view/feature/132330/the_pacman_dossier.php
// https://gameinternals.com/understanding-pac-man-ghost-behavior


function init() {

  const game = {
    gameRunning: false,
    score: 0,
    highScore: 0,
    audio: document.getElementById('player')
  }

  const player = {
    location: 0,
    super: false,
    animTime: 500
  } 

  const gridWidth = 28
  const gridHeight = 36
  const cellCount = gridWidth * gridHeight
  const cellMap = []
  const stageOne = [
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,6,6,6,6,6,6,6,6,6,6,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,2,2,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    4,6,6,6,6,6,0,6,6,1,2,2,2,2,2,2,2,2,1,6,6,0,6,6,6,6,6,4,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,6,6,6,6,6,6,6,6,6,6,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,0,0,1,1,0,0,0,0,0,0,0,6,3,0,0,0,0,0,0,0,1,1,0,0,5,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
  ]

  buildArena(stageOne)
  document.addEventListener('keyup', handleKeyPress)

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

  function buildArena(stage) {
    console.log('Building arena')
    // create grid of cells
    const grid = document.getElementById('game-grid')
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      // cell.innerText = i
      // check current stage map
      if (stage[i] === 0) {
        // add pellets
        cell.classList.add('pellet')
      } else if (stage[i] === 1) {
        // make edges of grid into walls
        cell.classList.add('wall')
      } else if (stage[i] === 2) {
        // set up ghost house
        cell.classList.add('ghost-house')
      } else if (stage[i] === 3) {
        // place player
        cell.classList.add('player')
        player.location = i
      } else if (stage[i] === 4) {
        // set up teleport zones
        cell.classList.add('teleport-zone')
      } else if (stage[i] === 5) {
        // add powerups
        cell.classList.add('powerup')
      }
      cellMap.push(cell)
      grid.appendChild(cell)
    }
  }

  function removePlayer(loc) {
    cellMap[loc].classList.remove('player')
  }

  function addPlayer(loc) {
    const targetCell = cellMap[loc].classList
    if (targetCell.contains('pellet')) {
      game.score += 10
      game.audio.src = 'assets/sounds/pellet.mp3'
      game.audio.play()
      targetCell.remove('pellet')
    } else if (targetCell.contains('powerup')) {
      game.score += 50
      player.super = true
      game.audio.src = 'assets/sounds/powerup.mp3'
      game.audio.play()
      targetCell.remove('powerup')
    }
    cellMap[loc].classList.add('player')
  }

  function handleKeyPress(event) {

    const prev = player.location
    const key = event.key

    // WASD controls
    const w = 'w'
    const a = 'a'
    const s = 's'
    const d = 'd'
    // arrow key controls
    const upArrow = 'ArrowUp'
    const downArrow = 'ArrowDown'
    const leftArrow = 'ArrowLeft'
    const rightArrow = 'ArrowRight'

    if (key === w || key === upArrow) {
      console.log('Pressed up')
      const aboveProps = cellMap[player.location - gridWidth].classList

      // check to make sure the intended destination should be accessible
      if (!aboveProps.contains('wall')) {
        player.location -= gridWidth
        // // animate the movement
        // cellMap[prev].classList.add('move-up')
        // setTimeout(cellMap[prev].classList.remove('move-up'), player.animTime)
      }
    } else if (key === a || key === leftArrow) {
      console.log('Pressed left')
      const leftProps = cellMap[player.location - 1].classList

      // check to make sure the intended destination should be accessible
      if (!leftProps.contains('wall')) {
        
        // cellMap[player.location].classList.add('move-left')
        player.location--
        // // animate the movement
        // setTimeout(() => {
        //   cellMap[prev].classList.remove('move-left')
        // }, player.animTime)
      }
    } else if (key === s || key === downArrow) {
      console.log('Pressed down')
      const belowProps = cellMap[player.location + gridWidth].classList

      // check to make sure the intended destination should be accessible
      if (!belowProps.contains('wall')) {
        player.location += gridWidth
        // // animate the movement
        // cellMap[prev].classList.add('move-down')
        // setTimeout(cellMap[prev].classList.remove('move-down'), player.animTime)
      }
    } else if (key === d || key === rightArrow) {
      console.log('Pressed right')
      const rightProps = cellMap[player.location + 1].classList

      // check to make sure the intended destination should be accessible
      if (!rightProps.contains('wall')) {
        player.location++
        // // animate the movement
        // cellMap[prev].classList.add('move-right')
        // setTimeout(() => {
        //   cellMap[prev].classList.remove('move-right')
        // }, player.animTime)
      }
    } else {
      console.log(`Key "${event.key}" not recognised!`)
    }
    removePlayer(prev)
    addPlayer(player.location)
  }


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

  class Ghost {
    constructor(position, target, scared) {
      this.position = position,
      this.target = target,
      this.scared = scared
    }
  }

  const blinky = new Ghost(0, 0, false)
  const pinky = new Ghost(0, 0, false)
  const inky = new Ghost(0, 0, false)
  const clyde = new Ghost(0, 0, false)
}

window.addEventListener('DOMContentLoaded', init)
