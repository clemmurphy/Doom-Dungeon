function init() {

  // ! OBJECTS

  const game = {
    score: 0,
    highScore: 0,
    audio1: document.getElementById('track1'),
    audio2: document.getElementById('track2'),
    maxPellets: 0,
    pelletCount: 0,
    superDuration: 15000,
    pinkySpawned: false,
    inkySpawned: false,
    clydeSpawned: false
  }

  const player = {
    posX: 0,
    posY: 0,
    super: false,
    animTime: 500,
    facing: 'right',
    name: ''
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
    1,8,0,0,0,0,8,0,0,0,0,0,8,1,1,8,0,0,0,0,0,8,0,0,0,0,8,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,8,0,0,0,0,8,0,8,0,0,0,8,0,0,8,0,0,0,8,0,8,0,0,0,0,8,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,
    1,8,0,0,0,0,8,1,8,0,0,0,8,1,1,8,0,0,0,8,1,8,0,0,0,0,8,1,
    1,1,1,1,1,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,1,1,1,1,6,1,1,6,1,1,1,1,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,7,6,6,6,7,6,6,7,6,6,6,7,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,2,2,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    1,4,2,2,2,2,8,6,7,1,2,10,2,2,2,2,11,2,1,7,6,8,2,2,2,2,9,1,
    1,1,1,1,1,1,0,1,6,1,2,2,2,2,2,2,2,2,1,6,1,0,1,1,1,1,1,1,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,7,6,6,6,6,6,6,6,6,6,6,7,1,0,1,6,6,6,6,6,
    6,6,6,6,6,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,6,6,6,6,6,
    1,1,1,1,1,1,0,1,6,1,1,1,1,1,1,1,1,1,1,6,1,0,1,1,1,1,1,1,
    1,8,0,0,0,0,8,0,8,0,0,0,8,1,1,8,0,0,0,8,0,8,0,0,0,0,8,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,5,1,
    1,8,0,0,1,1,8,0,8,0,0,0,8,6,3,8,0,0,0,8,0,8,1,1,0,0,8,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,
    1,8,0,8,0,0,8,1,8,0,0,0,8,1,1,8,0,0,0,8,1,8,0,0,8,0,8,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,8,0,0,0,0,0,0,0,0,0,0,8,0,0,8,0,0,0,0,0,0,0,0,0,0,8,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
  ]
  const cellMap = []
  const teleportL = []
  const teleportR = []

  const music = document.getElementById('music')

  const localStorage = window.localStorage

  class Ghost {
    constructor(spawnY, spawnX, state, speed, name, homeY, homeX) {
      this.spawnY = spawnY,
      this.spawnX = spawnX,
      this.state = state,
      this.speed = speed,
      this.name = name,
      this.homeY = homeY,
      this.homeX = homeX,
      this.movePrio = [0, 0],
      this.moving = false,
      this.posY = 0,
      this.posX = 0
    }
    
    spawn() {
      cellMap[this.spawnY][this.spawnX].classList.add(`${this.name}`)
      this.posY = this.spawnY
      this.posX = this.spawnX
      const leaveHouse = setInterval(() => {
        if (cellMap[this.posY - 1][this.posX].classList.contains('wall')) {
          clearInterval(leaveHouse)
          this.move()
        } else {
          removeGhost(this.name, this.posY, this.posX)
          this.posY = this.posY - 1
          addGhost(this.name, this.posY, this.posX)
        }
      }, this.speed)
      const setChase = setTimeout(() => {
        this.state = 'chase'
      }, 7000)
    }

    updatePrios() {
      const leftCell = cellMap[this.posY][this.posX - 1]
      const rightCell = cellMap[this.posY][this.posX + 1]
      const upCell = cellMap[this.posY - 1][this.posX]
      const downCell = cellMap[this.posY + 1][this.posX]

      let trgtY = 0
      let trgtX = 0

      // check which state the ghost is in and update target accordingly
      if (this.state === 'scatter') {
        trgtY = this.homeY
        trgtX = this.homeX
      } else if (this.state === 'chase') {
        trgtY = player.posY
        trgtX = player.posX
      }

      // update for each ghost
      // inky moves to a random destination near-ish the player
      if (this.name === 'inky') {
        trgtY += Math.floor(Math.random() * 10)
        trgtX += Math.floor(Math.random() * 10)
      // pinky targets 4 tiles in front of the player
      } else if (this.name === 'pinky') {
        if (player.facing === 'up') {
          trgtY -= 4
        } else if (player.facing === 'down') {
          trgtY += 4
        } else if (player.facing === 'left') {
          trgtX -= 4
        } else if (player.facing === 'right') {
          trgtX += 4
        }
      // clyde targets the player until getting close then scatters
      } else if (this.name === 'clyde') {
        const distance = ((player.posY - this.posY) + (player.posX - this.posX)) / 2
        if (distance <= 8) {
          clyde.state = 'scatter'
          trgtY = this.homeY
          trgtX = this.homeX
        } else {
          clyde.state = 'chase'
          trgtY = player.posY
          trgtX = player.posX
        }
      }

      // find distance from goal
      const diffY = trgtY - this.posY
      const diffX = trgtX - this.posX

      // prioritise furthest distance first

      // if is X further than Y
      if (Math.abs(diffY) <= Math.abs(diffX)) {

        // if x diff is negative (left)
        if (diffX < 0) {
          // check if left is an option
          if (!leftCell.classList.contains('wall') && !leftCell.classList.contains('ghost-house')) {
            this.movePrio = [0, -1]
            // if not, use other axis
          } else if (diffY < 0) {
            // check if up is an option
            if (!upCell.classList.contains('wall') && !upCell.classList.contains('ghost-house')) {
              this.movePrio = [-1, 0]
            } else if (!downCell.classList.contains('wall') && !downCell.classList.contains('ghost-house')) {
              this.movePrio = [1, 0]
              // opposite first prio: check if down is an option
            } else {
              this.movePrio = [0, 1]
            }
            // opposite second prio: check if down is an option
          } else if (!downCell.classList.contains('wall') && !downCell.classList.contains('ghost-house')) {
            this.movePrio = [1, 0]
            // opposite first prio: check if down is an option
          } else {
            this.movePrio = [0, 1]
          }

        // else if x diff is positive (right)
        } else if (!rightCell.classList.contains('wall') && !rightCell.classList.contains('ghost-house')) {
          this.movePrio = [0, 1]
          // if not, use other axis
        } else if (diffY < 0) {
          // check if up is an option
          if (!upCell.classList.contains('wall') && !upCell.classList.contains('ghost-house')) {
            this.movePrio = [-1, 0]
          } else if (!downCell.classList.contains('wall') && !downCell.classList.contains('ghost-house')) {
            this.movePrio = [1, 0]
            // if nothing else, go left
          } else {
            this.movePrio = [0, -1]
          }
          // if not, try down
        } else if (!downCell.classList.contains('wall') && !downCell.classList.contains('ghost-house')) {
          this.movePrio = [1, 0]
          // if nothing else, go left
        } else {
          this.movePrio = [0, -1]
        }

      // Y further than X
      } else {
        // if y diff is negative (up)
        if (diffY < 0) {
          // check if up is an option
          if (!upCell.classList.contains('wall') && !upCell.classList.contains('ghost-house')) {
            this.movePrio = [-1, 0]
            // if not, use other axis
          } else if (diffX < 0) {
            // if pref left, check if left is an option
            if (!leftCell.classList.contains('wall') && !leftCell.classList.contains('ghost-house')) {
              this.movePrio = [0, -1]
            } else if (!rightCell.classList.contains('wall') && !rightCell.classList.contains('ghost-house')) {
              this.movePrio = [0, 1]
            // else go down
            } else {
              this.movePrio = [1, 0]
            }
            // else if pref right, check if right is an option
          } else if (!rightCell.classList.contains('wall') && !rightCell.classList.contains('ghost-house')) {
            this.movePrio = [0, 1]
          // else go down
          } else {
            this.movePrio = [1, 0]
          }
        
        // if Y diff is positive (down)
        // check if down is an option
        } else if (!downCell.classList.contains('wall') && !downCell.classList.contains('ghost-house')) {
          this.movePrio = [1, 0]
        // if not, use other axis
        } else if (diffX < 0) {
          // if pref left, go left
          if (!leftCell.classList.contains('wall') && !leftCell.classList.contains('ghost-house')) {
            this.movePrio = [0, -1]
          // else if pref right, go right
          } else if (!rightCell.classList.contains('wall') && !rightCell.classList.contains('ghost-house')) {
            this.movePrio = [0, 1]
            // else go up
          } else {
            this.movePrio = [-1, 0]
          }
        } else if (!rightCell.classList.contains('wall') && !rightCell.classList.contains('ghost-house')) {
          this.movePrio = [0, 1]
          // else go up
        } else {
          this.movePrio = [-1, 0]
        }
      }

      console.log(`moving to ${this.movePrio}`)
    }

    move() {
      const moveSpeed = this.speed
      console.log('moving')

      this.updatePrios()

      // start moving
      const move = setInterval(() => {
        console.log(`${this.state}`)
        removeGhost(this.name, this.posY, this.posX)

        // check to see if ghost is dead
        if (this.state === 'dead') {
          removeGhost(this.name, this.posY, this.posX)
          clearInterval(move)
        }

        // move in preferred direction one square
        this.posY += this.movePrio[0]
        this.posX += this.movePrio[1]

        // if goes over an intersection, update priorities again
        if (cellMap[this.posY][this.posX].classList.contains('intersection')) {
          this.updatePrios()
        }

        // console log if they walk through a wall...
        if (cellMap[this.posY][this.posX].classList.contains('wall')) {
          console.log(`${this.name} walked into a wall at ${this.posY}x${this.posX} trying to get to ${this.movePrio}`)
        }

        // if it moves into a player, handle
        if (this.posY === player.posY && this.posX === player.posX && cellMap[player.posY][player.posX].classList.contains(`${this.name}`)) {
          ghostCollision(this)
        }
        addGhost(this.name, this.posY, this.posX)
      }, moveSpeed)
    }
  }

  // instantiate ghosts
  const blinky = new Ghost(18, 13, 'scatter', 1000, 'blinky', 0, 0)
  const pinky = new Ghost(18, 14, 'scatter', 750, 'pinky', 0, gridWidth)
  const inky = new Ghost(19, 13, 'scatter', 800, 'inky', gridHeight, 0)
  const clyde = new Ghost(19, 14, 'scatter', 600, 'clyde', gridHeight, cellCount)

  // main menu UI items
  const menuMonster = document.querySelector('.menu-enemy')
  const menuPlayer = document.querySelector('.menu-player')

  menuMonster.addEventListener('mouseenter', () => {
    game.audio1.src = 'assets/sounds/honk1.mp3'
    game.audio1.play()
  })

  menuPlayer.addEventListener('mouseenter', () => {
    game.audio2.src = 'assets/sounds/honk2.mp3'
    game.audio2.play()
  })

  menuLoad()

  // ! FUNCTIONS
  function menuLoad() {
    // show menu and hide game and game over screen
    document.getElementById('menu-section').style.display = 'flex'
    document.getElementById('game-section').style.display = 'none'
    document.getElementById('game-over-screen').style.display = 'none'

    // enable start game button
    const startButton = document.getElementById('start-game')
    startButton.addEventListener('click', () => {
      player.name = nameInput.value
      localStorage.setItem('lastUsedName', player.name)
      console.log(player.name)
      startGame()
    })

    // check for high scores in local storage and update
    if (localStorage.getItem('highScore')) {
      game.highScore = localStorage.getItem('highScore')
      game.highScoreName = localStorage.getItem('highScoreName')
    }
    document.getElementById('menu-high-score').innerText = `${game.highScore} ${game.highScoreName}`

    // populate name
    const nameInput = document.getElementById('name-entry')
    if (localStorage.getItem('lastUsedName')) {
      nameInput.innerText = localStorage.getItem('lastUsedName')
    }

    // random placeholder
    const placeholderNames = ['big dave', 'boggy b', 'wibbler', 'fisto', 'ratty', 'rob', 'pacman', 'blinky', 'inky', 'pinky', 'clyde']
    nameInput.placeholder = placeholderNames[Math.floor(Math.random() * placeholderNames.length)]

    // get random name
    const randomName = document.getElementById('random-name')
    randomName.addEventListener('click', () => {
      randomName.classList.add('shake')
      setTimeout(() => {
        randomName.classList.remove('shake')
      }, 200)
      nameInput.value = placeholderNames[Math.floor(Math.random() * placeholderNames.length)]
    })

    // ensure music is not playing
    music.pause()
  }

  function endGame() {
    // stop key inputs
    document.removeEventListener('keyup', handleKeyPress)

    // remove powerup mode if active
    const wrapper = document.querySelector('.wrapper')
    wrapper.classList.remove('powerup-mode')

    // remove player
    cellMap[player.posY][player.posX].classList.remove('player')

    // show game over screen
    document.getElementById('menu-section').style.display = 'none'
    document.getElementById('game-section').style.display = 'none'
    document.getElementById('game-over-screen').style.display = 'flex'

    // stop music and sounds
    music.pause()
    game.audio1.pause()
    game.audio2.pause()

    // show high score
    document.getElementById('game-over-high-score').innerText = `${game.highScore} ${game.highScoreName}`

    // enable return to menu button
    const menuButton = document.getElementById('menu-button')
    menuButton.addEventListener('click', () => {
      location.reload()
    })
  }

  function startGame() {
    document.getElementById('menu-section').style.display = 'none'
    document.getElementById('game-section').style.display = 'flex'
    document.getElementById('game-over-screen').style.display = 'none'

    const endButton = document.getElementById('end-game-button')
    endButton.addEventListener('click', endGame)

    // reset score and update UI
    game.score = 0
    updateScore(0)
    document.getElementById('high-score').innerText = `${game.highScore} ${game.highScoreName}`
    
    // build arena
    buildArena(stageOne)
    // start listening for key presses
    document.addEventListener('keyup', handleKeyPress)

    // spawn first ghost
    blinky.spawn()

    // play music
    music.volume = 0.2
    music.loop = true
    music.play()
  }

  function updateScore(score) {
    game.score += score
    document.getElementById('score').innerText = game.score
    if (game.score > game.highScore) {
      game.highScore = game.score
      game.highScoreName = player.name
      document.getElementById('high-score').innerText = `${game.highScore} ${game.highScoreName}`
      localStorage.setItem('highScore', game.highScore)
      localStorage.setItem('highScoreName', player.name)
    }
  }
  
  function buildArena(stage) {
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
          // add to pellet counter
          updatePellets(1)
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
          // set up left teleport zone
          cell.classList.add('teleport-left')
          teleportL.push(yNum)
          teleportL.push(xNum)
        } else if (stage[i] === 5) {
          // add powerups
          cell.classList.add('powerup')
        } else if (stage[i] === 7) {
          // add intersections
          cell.classList.add('intersection')
        } else if (stage[i] === 8) {
          // add intersections
          cell.classList.add('intersection')
          // add pellets
          cell.classList.add('pellet')
          // add to pellet counter
          updatePellets(1)
        } else if (stage[i] === 9) {
          // set up right teleport zone
          cell.classList.add('teleport-right')
          teleportR.push(yNum)
          teleportR.push(xNum)
        } else if (stage[i] === 11) {
          cell.classList.add('prisoner')
        } else if (stage[i] === 10) {
          if (Math.random().toFixed(1) > 0.5) {
            cell.classList.add('green-flag')
          } else {
            cell.classList.add('red-flag')
          }
        }
        xNum++
        mapRow.push(cell)
        grid.appendChild(cell)
      }
      cellMap.push(mapRow)
      yNum++
    }
    game.maxPellets = game.pelletCount
  }

  function updatePellets(num) {
    game.pelletCount += num
    document.getElementById('pellet-counter').innerText = game.pelletCount
    if (game.pelletCount <= game.maxPellets - 10 && game.pinkySpawned === false) {
      pinky.spawn()
      game.pinkySpawned = true
    }
    if (game.pelletCount <= game.maxPellets - 30 && game.inkySpawned === false) {
      inky.spawn()
      game.inkySpawned = true
    }
    if (game.pelletCount <= game.maxPellets - 60 && game.clydeSpawned === false) {
      clyde.spawn()
      game.clydeSpawned = true
    }
    // handle game end
    if (game.pelletCount === 0) {
      
      console.log('All pellets collected!')

      // stop key inputs
      document.removeEventListener('keyup', handleKeyPress)

      // stop music and play death sound
      music.pause()
      game.audio1.src = 'assets/sounds/win.mp3'
      game.audio1.volume = 0.3
      game.audio1.play()

      // show game win text
      document.getElementById('level-clear-text').style.display = 'flex'
      cellMap[player.posY][player.posX].classList.add('player-dead')

      // end game after 2 second delay
      setTimeout(endGame, 2000)
    }
  }

  function ghostCollision(ghost) {
    console.log('Ghost touched player!')
    // if player is super state and ghosts are in scared state
    if (player.super === true) {

      // remove ghost, update score, stop movement and set respawn timer
      ghost.state = 'dead'
      cellMap[ghost.posY][ghost.posX].classList.remove(ghost.name)
      console.log('Player killed ghost!')
      updateScore(500)

      // play sound
      game.audio2.src = 'assets/sounds/ghost-killed.mp3'
      game.audio2.volume = 0.3
      game.audio2.play()

      setTimeout(() => {
        ghost.spawn()
      }, 10000)

    // if player not super
    } else if (player.super === false) {
      console.log('Ghost killed player!')

      // stop key inputs
      document.removeEventListener('keyup', handleKeyPress)

      // remove player and ghost
      removePlayer(player.posY, player.posX)
      cellMap[player.posY][player.posX].classList.remove(ghost.name)

      // stop music and play death sound
      music.pause()
      game.audio2.src = 'assets/sounds/player-death.mp3'
      game.audio2.volume = 0.3
      game.audio2.play()

      // animate death
      cellMap[player.posY][player.posX].classList.add('player-dead')

      // end game after 2 second delay
      setTimeout(endGame, 2000)
    }
  }

  function playerPowerup() {
    // set powerup and scared states
    player.super = true
    blinky.state = 'scared'
    pinky.state = 'scared'
    inky.state = 'scared'
    clyde.state = 'scared'

    // add body effects
    const wrapper = document.querySelector('.wrapper')
    wrapper.classList.add('powerup-mode')

    // add score and play collect sound
    updateScore(50)
    game.audio2.src = 'assets/sounds/powerup.mp3'
    game.audio2.play()

    // play powerup music
    music.src = 'assets/sounds/powerup.wav'
    music.play()

    // reset all once powerup expires
    setTimeout(() => {
      player.super = false
      blinky.state = 'chase'
      pinky.state = 'chase'
      inky.state = 'chase'
      clyde.state = 'chase'

      wrapper.classList.remove('powerup-mode')

      music.src = 'assets/sounds/music.wav'
      music.play()
    }, game.superDuration)
  }

  function removePlayer(posY, posX) {
    cellMap[posY][posX].classList.remove('player')
  }

  function addPlayer(posY, posX) {
    const targetCell = cellMap[posY][posX].classList
    if (targetCell.contains('pellet')) {
      updateScore(10)
      game.audio1.src = 'assets/sounds/pellet.mp3'
      game.audio1.play()
      targetCell.remove('pellet')
      updatePellets(-1)
      document.getElementById('pellet-counter').innerText = game.pelletCount
    } else if (targetCell.contains('powerup')) {
      playerPowerup()
      targetCell.remove('powerup')
    }
    targetCell.add('player')
  }

  function removeGhost (name, posY, posX) {
    cellMap[posY][posX].classList.remove(`${name}`)
  }

  function addGhost(name, posY, posX) {
    cellMap[posY][posX].classList.add(`${name}`)
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
      const aboveProps = cellMap[player.posY - 1][player.posX].classList

      // check to make sure the intended destination should be accessible
      if (!aboveProps.contains('wall')) {
        player.facing = 'up'
        player.posY--
      }
    } else if (key === a || key === leftArrow) {
      const leftProps = cellMap[player.posY][player.posX - 1].classList

      // check to make sure the intended destination should be accessible
      if (!leftProps.contains('wall')) {
        player.facing - 'left'
        player.posX--
      }
    } else if (key === s || key === downArrow) {
      const belowProps = cellMap[player.posY + 1][player.posX].classList

      // check to make sure the intended destination should be accessible
      if (!belowProps.contains('wall')) {
        player.facing = 'down'
        player.posY++
      }
    } else if (key === d || key === rightArrow) {
      const rightProps = cellMap[player.posY][player.posX + 1].classList

      // check to make sure the intended destination should be accessible
      if (!rightProps.contains('wall')) {
        player.facing = 'right'
        player.posX++
      }
    } else {
      console.log(`Key "${event.key}" not recognised!`)
    }
    const cellProps = cellMap[player.posY][player.posX].classList

    // if the new location is a ghost, handle the collision
    if (cellProps.contains('blinky')) {
      ghostCollision(blinky)
    } else if (cellProps.contains('inky')) {
      ghostCollision(inky)
    } else if (cellProps.contains('pinky')) {
      ghostCollision(pinky)
    } else if (cellProps.contains('clyde')) {
      ghostCollision(clyde)
    }

    // if the player goes into a teleporter, put them at the other one
    if (cellProps.contains('teleport-left')) {
      player.posY = teleportR[0]
      player.posX = teleportR[1]
      game.audio1.src = 'assets/sounds/door1.mp3'
      game.audio1.play()
    }
    if (cellProps.contains('teleport-right')) {
      player.posY = teleportL[0]
      player.posX = teleportL[1]
      game.audio2.src = 'assets/sounds/door2.mp3'
      game.audio2.play()
    }

    addPlayer(player.posY, player.posX)
  }
}

window.addEventListener('DOMContentLoaded', init)