import { CELL_SIZE, CANVAS_SIZE, STATE_COLORS } from './config.js';

export class Snake {
  constructor(grid) {
    this.grid = grid;
    this.reset();
    this.alive = true;
    this.currentPosition = {
      x: Math.floor(Math.random() * this.grid.cols),
      y: Math.floor(Math.random() * this.grid.rows)
    };
    this.movementDirection = 'down'; // Default direction
    this.updateHeadPosition();
    this.bodyLength = 3;
    this.bodyCoordinates = [{...this.currentPosition}]; // Store body segments
  }

  reset() {
    this.currentPosition = {
      x: Math.floor(Math.random() * this.grid.cols),
      y: Math.floor(Math.random() * this.grid.rows)
    };

    // Set initial direction based on starting position
    if (this.currentPosition.x > this.grid.cols / 2) {
      this.movementDirection = 'left';
    } else if (this.currentPosition.x < this.grid.cols / 2) {
      this.movementDirection = 'right';
    } else if (this.currentPosition.y > this.grid.rows / 2) {
      this.movementDirection = 'up';
    } else {
      this.movementDirection = 'down';
    }

    this.bodyLength = 3;
    this.bodyCoordinates = [ { ...this.currentPosition } ];
    this.alive = true;
    this.updateHeadPosition();
  }
// ...existing code...

  updateHeadPosition() {
    this.grid.setCell(this.currentPosition.x, this.currentPosition.y, 'head');
    this.bodyCoordinates.push({ ...this.currentPosition });
    if (this.bodyCoordinates.length > this.bodyLength) {
      const removedSegment = this.bodyCoordinates.shift();
      this.grid.resetCell(removedSegment.x, removedSegment.y);
    }

  }

  move() {
  if (!this.alive) {
    console.warn("Snake is not alive. Cannot move.");
    return;
  }

  let newPosition = { ...this.currentPosition };

  switch (this.movementDirection) {
    case 'up':
      newPosition.y -= 1;
      break;
    case 'down':
      newPosition.y += 1;
      break;
    case 'left':
      newPosition.x -= 1;
      break;
    case 'right':
      newPosition.x += 1;
      break;
  }

  // Check boundaries
  if (
    newPosition.x < 0 ||
    newPosition.x >= this.grid.cols ||
    newPosition.y < 0 ||
    newPosition.y >= this.grid.rows
  ) {
    this.alive = false;
    console.warn("Snake hit the wall. Game over.");
    this.grid.resetCell(this.currentPosition.x, this.currentPosition.y);
    this.reset();
    return;
  }

  // Add new head position to bodyCoordinates
  this.bodyCoordinates.push({ ...newPosition });

  // Remove tail if needed
  if (this.bodyCoordinates.length > this.bodyLength) {
    const removedSegment = this.bodyCoordinates.shift();
    this.grid.resetCell(removedSegment.x, removedSegment.y);
  }

  // Update all body segments in the grid
  // Set all to 'body' except the last one (the head)
  for (let i = 0; i < this.bodyCoordinates.length - 1; i++) {
    const seg = this.bodyCoordinates[i];
    this.grid.setCell(seg.x, seg.y, 'body');
  }
  // Set the head
  const head = this.bodyCoordinates[this.bodyCoordinates.length - 1];
  this.grid.setCell(head.x, head.y, 'head');

  // Update currentPosition
  this.currentPosition = { ...newPosition };
}

  changeDirection(direction) {
    // Prevent 180-degree turns
    if ((this.movementDirection === 'up' && direction === 'down') ||
        (this.movementDirection === 'down' && direction === 'up') ||
        (this.movementDirection === 'left' && direction === 'right') ||
        (this.movementDirection === 'right' && direction === 'left')) {
      return;
    }
    this.movementDirection = direction;
  }

  getHeadPosition() {
    return this.currentPosition;
  }

  isAlive() {
    return this.alive;
  }

  getBodyLength() {
    return this.bodyLength;
  }

  growBody() {
    this.bodyLength++;
    // add Logic to add a new segment to the snake's body
    const newSegment = { ...this.currentPosition };
    this.grid.setCell(newSegment.x, newSegment.y, 'body');
    this.bodyCoordinates.push(newSegment);
  }


}