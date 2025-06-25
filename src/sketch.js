
let grid;
let w = 16;
let cols, rows;
let hueValue = 200;

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

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

//check if a cell is below the specificed row
function belowRow(j, row) {
    return j > row;
}

function aboveRow(j, row) {
    return j < row;
}

function setup() {
  createCanvas(960, 960);
  colorMode(RGB, 255, 255, 255); // Use RGB color mode
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  background(0);

  print("Columns: " + cols + ", Rows: " + rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
    }
  }
  grid[0][0].state = 'head'; // Set the first cell to head
}

function keyPressed(event) {


    return false; // Prevent default action
}

function mouseDragged() {
  
}

const stateToColor = {
  'empty': [255, 255, 255], // Light gray for empty cells
  'head': [255, 0, 0] // Red for filled cells
}

function draw() {
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
  // // Create a 2D array for the next frame of animation
  // let nextGrid = make2DArray(cols, rows);
  
  // // Check every cell
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows ; j++) {
  //     // What is the state?
  //     let state = grid[i][j];
      
  //   }
  // }
  // grid = nextGrid;
}