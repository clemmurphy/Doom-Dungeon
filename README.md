![screencapture-file-C-Users-clemm-Desktop-dev-SEI58-Projects-Project-1-SEI-Project-1-index-html-2021-09-03-10_48_57](https://user-images.githubusercontent.com/25615907/131986303-c9f73828-9402-4c74-b89f-b12a018fd1a4.png)

# Sir Pac of Man: Doom Dungeon

## 🤔 What is it?
This is a Pac-Man clone created using only vanilla JavaScript, HTML and CSS with no libraries or frameworks. The player can move around the screen, collect coins, run from four unique types of pathfinding enemies, collect powerups and log their highest scores.

## 🎮 How to Play 
Use either the arrow keys or WASD to move around the arena, avoid the evil enemies, and collect as many coins as you can. Collecting a chest turns the tables, with the player now able to defeat enemies for extra points. Be wary though, the power of the chests only lasts a limited time, and enemies will not forget you after it runs out!

## 🤖 Why make this?
This project was made as a test of my JavaScript skills for General Assembly's Software Engineering Immersive course. It showcases how you can use a combination of JavaScript DOM manipulation to create complex logic and interactive experiences.

![screencapture-file-C-Users-clemm-Desktop-dev-SEI58-Projects-Project-1-SEI-Project-1-index-html-2021-09-03-10_49_08](https://user-images.githubusercontent.com/25615907/131986321-f0d0809f-1d58-465d-ba3e-0f9f80ab2ae4.png)

## How does it work?
### 🗺️ Building the Map
The arena is built at runtime, using a flex grid of cells. The map itself is designed using a CSV, which is then added into the JavaScript file as an array, iterated by a loop, then built onto a 2-dimensional array to give some form of cell co-ordinates system for tracking entities.

### 👾 Tracking entities
All entities, including walls, player, enemies and decorations, are added dynamically to the DOM on a grid of divs that act as playing area cells. They are tracked using CSS classes, meaning tests with JavaScript can determine if the player or enemy entities can move into certain grid squares.

### 🧮 Retaining Scores
High scores and names are retained using browser local storage. Players can enter their names and add them to the high score list

### 👹 Pathfinding and Enemy Personalities
The majority of the logic is in determining the enemy pathfinding. The decision to move in any given direction is taken by measuring the whether X or Y axis is furthest from the target square, then ensuring the correct direction is not through a wall or other forbidden area. The decision logic is re-run every time an enemy reaches an intersection to ensure they are tracking the target correctly.

Just like Pac-Man, each enemy type has its own 'personality' or tracking style similar to Pac-Man!


![slime](https://user-images.githubusercontent.com/25615907/131990067-0b76a4e9-5a30-4f2f-8ad7-f1da24fcfcc7.gif) Blinky (red ghost) tracks the most direct path to the player

![flying-enemy](https://user-images.githubusercontent.com/25615907/131990192-5bb4de4c-295c-4c25-99f1-82ca7b75cc3c.gif) Pinky (pink ghost) tracks a path towards four squares in front of the player's direction, meaning to intercept

![bomb](https://user-images.githubusercontent.com/25615907/131990240-6e88cfaf-1194-4e23-8ae6-627d69e60b1d.gif) Inky (blue ghost) makes semi-random decisions at each intersection, aiming for a random additional distance in front of the player

![goblin](https://user-images.githubusercontent.com/25615907/131990117-ecbd6490-5bae-4364-af2e-21114490aa03.gif) Clyde (yellow ghost) directly tracks the player until it gets within 8 squares, then tries to avoid, making their movement unpredictable
