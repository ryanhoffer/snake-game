import { CELL_SIZE, CANVAS_SIZE, STATE_COLORS } from './config.js';

export class Snake {
  constructor(grid) {
    this.grid = grid;
    this.reset();
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

    this.alive = true;
    this.updateHeadPosition();
  }

  updateHeadPosition() {
    const cell = this.grid.getCell(this.currentPosition.x, this.currentPosition.y);
    if (cell) {
      cell.state = 'head';
      cell.color = STATE_COLORS[cell.state];
    }
  }

  move() {
    if (!this.alive) {
      console.warn("Snake is not alive. Cannot move.");
      return;}

    let newPosition = {...this.currentPosition};

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
    if (newPosition.x < 0 || newPosition.x >= this.grid.cols || 
        newPosition.y < 0 || newPosition.y >= this.grid.rows) {
      this.alive = false;
      //HANDLE game over logic here, e.g., reset the snake or notify the game
      //reset snake to random position
      console.warn("Snake hit the wall. Game over.");
      this.grid.resetCell(this.currentPosition.x, this.currentPosition.y);
      this.reset();
      return;
    }

    // Clear old position
    this.grid.resetCell(this.currentPosition.x, this.currentPosition.y);
    
    // Update to new position
    this.currentPosition = newPosition;
    this.updateHeadPosition();
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
}