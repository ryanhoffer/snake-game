import { Grid } from './grid.js';
import { Snake } from './snake.js';
import { CANVAS_SIZE,KEY_BINDINGS, TICK_RATE, LEVEL } from './config.js';

export class Game {
  constructor() {
    this.grid = new Grid();
    this.snake = new Snake(this.grid);
    this.level = LEVEL;
    this.speedTimer = TICK_RATE / this.level;
    this.foodPosition = null;
  }

  setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    colorMode(RGB, 255, 255, 255);
    this.placeFood();
  }

  placeFood() {
    let emptyCells = [];
    for (let x = 0; x < this.grid.cols; x++) {
      for (let y = 0; y < this.grid.rows; y++) {
        if (this.grid.getCell(x, y).state === 'empty') {
          emptyCells.push({ x, y });
        }
      }
    }
    if (emptyCells.length > 0) {
      const idx = Math.floor(Math.random() * emptyCells.length);
      this.foodPosition = emptyCells[idx];
      this.grid.setCell(this.foodPosition.x, this.foodPosition.y, 'food');
    }
  }

  draw() {
    this.speedTimer -= 1;
    background(0);
    
    this.grid.draw();
    
    if (this.speedTimer <= 0 && this.snake.alive) {
      this.speedTimer = TICK_RATE / Math.max(this.level, 1);
      this.snake.move();

      // Check if snake head is on food
      const head = this.snake.getHeadPosition();
      if (head.x === this.foodPosition.x && head.y === this.foodPosition.y) {
        this.snake.growBody();
        this.placeFood();
      }
    }
  }

  handleKeyPress(key) {
    for (let dir in KEY_BINDINGS) {
      if (KEY_BINDINGS[dir].includes(key)) {
        this.snake.changeDirection(dir);
        break;
      }
    }
  }
}