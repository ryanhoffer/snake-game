import { Game } from './game.js';

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;

let game;

function setup() {
  game = new Game();
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.handleKeyPress(key);
  return false; // Prevent default behavior
}