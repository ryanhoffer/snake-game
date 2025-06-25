
let grid;
let w = 16;
let cols, rows;

let startingPosition;
let currentPosition;
let movementDirection;

const stateToColor = {
  'empty': [255, 255, 255], // Light gray for empty cells
  'head': [255, 0, 0] // Red for filled cells
}
//Key Bindings
const keyBindings = {
  'up': ['ArrowUp', 'w', 'W'],
  'down': ['ArrowDown', 's', 'S'],
  'left': ['ArrowLeft', 'a', 'A'],
  'right': ['ArrowRight', 'd', 'D'],
};

const actions = {
  moveUp: () => {
    movementDirection = 'up';
    console.log("Moving up");
  },
  moveDown: () => {
    movementDirection = 'down';
    console.log("Moving down");
  },
  moveLeft: () => {
    movementDirection = 'left';
    console.log("Moving left");
  },
  moveRight: () => {
    movementDirection = 'right';
    console.log("Moving right");
  },
}

function withinCols(i) {
  return i >= 0 && i < cols;
}
function withinRows(j) {
  return j >= 0 && j < rows;
}

//check if a cell is below the specificed row
function belowRow(j, row) {
    return j > row;
}

function aboveRow(j, row) {
    return j < row;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = { 
        state: 'empty',
        color: [255, 255, 255], // Default color is light gray in RGB
        x: i * w,
        y: j * w
      };
    }
  }
  return arr;
}

function setup() {
  createCanvas(960, 960);
  colorMode(RGB, 255, 255, 255); // Use RGB color mode
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  background(0);
  startingPosition = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; // Starting position of the head
  currentPosition = startingPosition; // Current position of the head
  if (startingPosition.x > cols / 2){
    movementDirection = 'left'; // Start moving left if starting position is in the right half
  }
  else if (startingPosition.x < cols / 2){
    movementDirection = 'right'; // Start moving right if starting position is in the left half
  }
  else if (startingPosition.y > rows / 2){
    movementDirection = 'up'; // Start moving up if starting position is in the bottom half 
  }
  else if (startingPosition.y < rows / 2){
    movementDirection = 'down'; // Start moving down if starting position is in the top half
  }
  console.log(`Starting position: (${startingPosition.x}, ${startingPosition.y})`);

  print("Columns: " + cols + ", Rows: " + rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
    }
  }
  grid[startingPosition.x][startingPosition.y].state = 'head'; // Set the first cell to head
}

// Handle key press
function keyPressed(event) {
  console.log(`Key pressed: ${event.key}`);
  let action = null;
  for (let dir in keyBindings) {
    if (keyBindings[dir].includes(event.key)) {
      action = 'move' + dir.charAt(0).toUpperCase() + dir.slice(1);
      break;
    }
  }
  if (action) {
    executeAction(action, event);
  } else {
    console.log(`No action bound for key: ${event.key}`);
  }
  return false; // Prevent default behavior
}

function executeAction(action, event) {
  switch (action) {
    case 'moveUp':
      actions.moveUp();
      break;
    case 'moveDown':
      actions.moveDown();
      break;
    case 'moveLeft':
      actions.moveLeft();
      break;
    case 'moveRight':
      actions.moveRight();
      break;
    default:
      console.log(`Unknown action: ${action}`);
  }
}

function mouseDragged() {
  
}

const level = 50; 
const tickRate = 40;
let speedTimer = tickRate / level; 
let alive = true; // Flag to control the game loop
function draw() {
  speedTimer -= 1;
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
      let color = stateToColor[cell.state];
      fill(color[0], color[1], color[2]); // Fill with the cell's color
      square(cell.x, cell.y, w);

      //console.log(`Cell at (${i}, ${j}) - State: ${cell.state}, Color: ${cell.color}`);
    }
  }
  noFill();
  stroke(0);
  strokeWeight(2); // Optional: make the outline thicker
  rect(0, 0, width, height);
  // copy grid to nextGrid
  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
      nextGrid[i][j] = { ...cell }; // Copy the cell to the next grid
    }
  }
  grid = nextGrid;

  if (speedTimer <= 0 && alive) {
    speedTimer = tickRate / Math.max(level, 1);

    if (movementDirection === 'down') {
      if (currentPosition.y + 1 >= rows) {
        alive = false;
        console.log("Reached the bottom of the grid, stopping the game");
      } else {
        grid[currentPosition.x][currentPosition.y].state = 'empty';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['empty'];
        currentPosition.y += 1;
        grid[currentPosition.x][currentPosition.y].state = 'head';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['head'];
      }
    } else if (movementDirection === 'up') {
      if (currentPosition.y - 1 < 0) {
        alive = false;
        console.log("Reached the top of the grid, stopping the game");
      } else {
        grid[currentPosition.x][currentPosition.y].state = 'empty';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['empty'];
        currentPosition.y -= 1;
        grid[currentPosition.x][currentPosition.y].state = 'head';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['head'];
      }
    } else if (movementDirection === 'left') {
      if (currentPosition.x - 1 < 0) {
        alive = false;
        console.log("Reached the left edge of the grid, stopping the game");
      } else {
        grid[currentPosition.x][currentPosition.y].state = 'empty';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['empty'];
        currentPosition.x -= 1;
        grid[currentPosition.x][currentPosition.y].state = 'head';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['head'];
      }
    } else if (movementDirection === 'right') {
      if (currentPosition.x + 1 >= cols) {
        alive = false;
        console.log("Reached the right edge of the grid, stopping the game");
      } else {
        grid[currentPosition.x][currentPosition.y].state = 'empty';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['empty'];
        currentPosition.x += 1;
        grid[currentPosition.x][currentPosition.y].state = 'head';
        grid[currentPosition.x][currentPosition.y].color = stateToColor['head'];
      }
    }
  }

  

}