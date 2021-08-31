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
    posX: 0,
    posY: 0,
    super: false,
    animTime: 500
  } 

  const gridWidth = 28
  const gridHeight = 36
  const cellCount = gridWidth * gridHeight
  const stageOne = [
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,7,0,0,0,0,0,0,1,1,0,0,0,0,0,0,7,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,7,0,0,0,0,7,0,7,0,0,0,7,0,0,7,0,0,0,7,0,7,0,0,0,0,7,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,7,1,0,0,0,0,0,1,1,0,0,0,0,0,1,7,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,6,6,6,7,6,6,7,6,6,6,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,2,2,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    4,6,6,6,6,6,7,6,7,1,2,2,2,2,2,2,2,2,1,7,6,7,6,6,6,6,6,4,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,7,6,6,6,6,6,6,6,6,6,6,7,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,7,0,7,0,0,0,0,1,1,0,0,0,0,7,0,7,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1,
    1,7,0,0,1,1,7,0,7,0,0,0,7,6,3,7,0,0,0,7,0,7,1,1,0,0,7,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,0,0,7,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,7,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,7,0,0,7,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
  ]
  const cellMap = []

  // build arena
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
    const grid = document.getElementById('game-grid')
    // each horizontal row added into an array
    let yNum = 0
    for (let rowStart = 0; rowStart < cellCount; rowStart += gridWidth) {
      const mapRow = []
      let xNum = 0
      for (let i = rowStart; i < (rowStart + gridWidth); i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
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
          player.posY = yNum
          player.posX = xNum
          console.log(`Player spawning at ${player.posY}x${player.posX}`)
        } else if (stage[i] === 4) {
          // set up teleport zones
          cell.classList.add('teleport-zone')
        } else if (stage[i] === 5) {
          // add powerups
          cell.classList.add('powerup')
        } else if (stage[i] === 7) {
          // add intersections
          cell.classList.add('intersection')
        }
        xNum++
        mapRow.push(cell)
        grid.appendChild(cell)
      }
      cellMap.push(mapRow)
      yNum++
    }
    console.log(cellMap)
  }

  function removePlayer(posY, posX) {
    cellMap[posY][posX].classList.remove('player')
  }

  function addPlayer(posY, posX) {
    const targetCell = cellMap[posY][posX].classList
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
    cellMap[posY][posX].classList.add('player')
  }

  function removeGhost(posY, posX) {
    cellMap[posY][posX].classList.remove('ghost')
  }

  function addGhost(posY, posX) {
    cellMap[posY][posX].classList.add('ghost')
  }

  function handleKeyPress(event) {

    const prevY = player.posY
    const prevX = player.posX
    const key = event.key

    removePlayer(prevY, prevX)

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
      console.log(`Attempting to move to ${player.posY}x${player.posX}`)

      const aboveProps = cellMap[player.posY - 1][player.posX].classList

      // check to make sure the intended destination should be accessible
      if (!aboveProps.contains('wall')) {
        player.posY--
      }
    } else if (key === a || key === leftArrow) {
      console.log('Pressed left')
      const leftProps = cellMap[player.posY][player.posX - 1].classList

      // check to make sure the intended destination should be accessible
      if (!leftProps.contains('wall')) {
        
        // cellMap[player.position].classList.add('move-left')
        player.posX--
      }
    } else if (key === s || key === downArrow) {
      console.log('Pressed down')
      const belowProps = cellMap[player.posY + 1][player.posX].classList

      // check to make sure the intended destination should be accessible
      if (!belowProps.contains('wall')) {
        player.posY++
      }
    } else if (key === d || key === rightArrow) {
      console.log('Pressed right')
      const rightProps = cellMap[player.posY][player.posX + 1].classList

      // check to make sure the intended destination should be accessible
      if (!rightProps.contains('wall')) {
        player.posX++
      }
    } else {
      console.log(`Key "${event.key}" not recognised!`)
    }
    addPlayer(player.posY, player.posX)
  }

      // check number of pellets left
        // if 10 gone, spawn first ghost
        // if 30 gone, spawn second ghost
        // if 60 gone, spawn third ghost
        // if none, game over (or go to next level?)
      // update ghost manager
        // run each ghost pathfinder
        // update target position

    // pathfinder(currentposition, playerposition)
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
    constructor(posY, posX, scared) {
      this.posY = posY,
      this.posX = posX,
      this.scared = scared,
      this.movePrio = [0, 0],
      this.moveSecond = [0, 0],
      this.lastMove = [0, 0]
    }
    
    spawn() {
      cellMap[this.posY][this.posX].classList.add('ghost')
      const leaveHouse = setInterval(() => {
        if (cellMap[this.posY - 1][this.posX].classList.contains('wall')) {
          clearInterval(leaveHouse)
          this.move()
        } else {
          removeGhost(this.posY, this.posX)
          this.posY = this.posY - 1
          addGhost(this.posY, this.posX)
        }
      }, 1000)
    }

    updatePrios() {
      // reset priorities
      this.movePrio = [0, 0]
      this.moveSecond = [0, 0]
      // set directional priorities
      const diffY = player.posY - this.posY
      const diffX = player.posX - this.posX
      console.log(`Moving in ${diffY}:${diffX} direction`)
      // prioritise furthest distance first
      // if x is further than y
      if (Math.abs(diffX) >= Math.abs(diffY)) {
        // if x diff is negative (left)
        if (diffX < 0) {
          this.movePrio[1] = -1
          this.lastMove = [0, -1]
        } else {
          this.movePrio[1] = 1
          this.lastMove = [0, 1]
        }
        if (diffY < 0) {
          this.moveSecond[0] = -1
        } else {
          this.moveSecond[0] = 1
        }
      } else {
        // if y is negative (down)
        if (diffY < 0 && this.lastMove !== [1, 0]) {
          this.movePrio[0] = -1
          this.lastMove = [-1, 0]
        } else {
          this.movePrio[0] = 1
          this.lastMove = [1, 0]
        }
        if (diffX < 0) {
          this.moveSecond[1] = -1
        } else {
          this.moveSecond[1] = 1
        }
      }
      console.log(`Ghost move priorities: ${this.movePrio}`)
    }

    move() {
      this.updatePrios()
      const move = setInterval(() => {
        removeGhost(this.posY, this.posX)
        const targetProps = cellMap[this.posY + (1 * this.movePrio[0])][this.posX + (1 * this.movePrio[1])].classList
        const secondaryProps = cellMap[this.posY + (1 * this.moveSecond[0])][this.posX + (1 * this.moveSecond[1])].classList
        // if there are no walls or ghost house tiles in 1st prio direction
        if (!targetProps.contains('wall') && !targetProps.contains('ghost-house')) {
          this.posY = this.posY + (1 * this.movePrio[0])
          this.posX = this.posX + (1 * this.movePrio[1])
        // if there are no walls or ghost house tiles in 2nd prio direction
        } else if (!secondaryProps.contains('wall'  && !secondaryProps.contains('ghost-house'))) {
          this.posY = this.posY + (1 * this.moveSecond[0])
          this.posX = this.posX + (1 * this.moveSecond[1])
        // if 1st and 2nd prio are unavailable, try to move down
        } else if (!cellMap[this.posY + 1][this.posX].classList.contains('wall')) {
          this.posY = this.posY + 1
          this.updatePrios()
        // if down unavailable, try to move up
        } else if (!cellMap[this.posY - 1][this.posX].classList.contains('wall')) {
          this.posY = this.posY - 1
          this.updatePrios()
        // if up unavailable, try to move right 
        } else if (!cellMap[this.posY][this.posX + 1].classList.contains('wall')) {
          this.posX = this.posX + 1
          this.updatePrios()
        // if right unavailable, try to move left
        } else if (!cellMap[this.posY][this.posX - 1].classList.contains('wall')) {
          this.posX = this.posX - 1
          this.updatePrios()
        }

        if (cellMap[this.posY][this.posX].classList.contains('intersection')) {
          this.updatePrios()
        }

        if (this.posY === player.posY && this.posX === this.posY) {
          // handle collision between ghost and player
          clearInterval(move)
        }
        addGhost(this.posY, this.posX)
      }, 1000)
    }
  }

  const blinky = new Ghost(18, 13, player.posY, player.posX, false)
  const pinky = new Ghost(18, 14, player.posY, player.posX, false)
  const inky = new Ghost(19, 13, player.posY, player.posX, false)
  const clyde = new Ghost(19, 14, player.posY, player.posX, false)

  blinky.spawn()
}

window.addEventListener('DOMContentLoaded', init)


// corners trigger decision
// xdiff and ydiff create order of priorities
// at each corner, recalculate decision and take highest-priority avenue
// cannot reverse