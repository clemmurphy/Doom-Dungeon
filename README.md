# Sir Pac of Man: Doom Dungeon

## What is it?
This is a Pac-Man clone created using only vanilla JavaScript, HTML and CSS with no libraries or frameworks. The player can move around the screen, collect coins, run from four unique types of pathfinding enemies, collect powerups and log their highest scores.

## How to Play
Use either the arrow keys or WASD to move around the arena, avoid the evil enemies, and collect as many coins as you can. Collecting a chest turns the tables, with the player now able to defeat enemies for extra points. Be wary though, the power of the chests only lasts a limited time, and enemies will not forget you after it runs out!

## Why make this?
This project was made as a test of my JavaScript skills for General Assembly's Software Engineering Immersive course. It showcases how you can use a combination of JavaScript DOM manipulation to create complex logic and interactive experiences.

## How does it work?
### Tracking entities
All entities, including walls, player, enemies and decorations, are added dynamically to the DOM on a grid of divs that act as playing area cells. They are tracked using CSS classes, meaning tests with JavaScript can determine if the player or enemy entities can move into certain grid squares.

### Retaining Scores
High scores and names are retained using browser local storage. Players can enter their names and add them to the high score list

### Pathfinding and Enemy Personalities
The majority of the logic is in determining the enemy pathfinding. The decision to move in any given direction is taken by measuring the whether X or Y axis is furthest from the target square, then ensuring the correct direction is not through a wall or other forbidden area. The decision logic is re-run every time an enemy reaches an intersection to ensure they are tracking the target correctly.

Just like Pac-Man, each enemy type has its own 'personality' or tracking style:

- Blinky (red ghost) tracks the most direct path to the player
- Pinky (pink ghost) tracks a path towards four squares in front of the player's direction, meaning to intercept
- Inky (blue ghost) makes semi-random decisions at each intersection, aiming for a random additional distance in front of the player
- Clyde (yellow ghost) directly tracks the player until it gets within 8 squares, then tries to avoid, making their movement unpredictable
