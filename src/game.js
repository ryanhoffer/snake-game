import { Grid } from './grid.js';
import { Snake } from './snake.js';
import { CANVAS_SIZE,KEY_BINDINGS, TICK_RATE, LEVEL } from './config.js';

export class Game {
  constructor() {
    this.grid = new Grid();
    this.snake = new Snake(this.grid);
    this.level = LEVEL;
    this.speedTimer = TICK_RATE / this.level;
  }

  setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    colorMode(RGB, 255, 255, 255);
    this.grid.setCell(0, 0, 'body');
    this.grid.setCell(1, 0, 'food');
  }

  draw() {
    this.speedTimer -= 1;
    background(0);
    
    this.grid.draw();
    
    if (this.speedTimer <= 0 && this.snake.alive) {
      this.speedTimer = TICK_RATE / Math.max(this.level, 1);
      this.snake.move();
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