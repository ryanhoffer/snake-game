// Game configuration constants
export const CELL_SIZE = 16;
export const GRID_SIZE = 20
export const CANVAS_SIZE = CELL_SIZE * GRID_SIZE;
export const TICK_RATE = 25;
export let LEVEL = 1;

export const STATE_COLORS = {
  'empty': [70, 60, 70],
  'head': [34, 139, 34],
  'body': [0, 128, 150],
  'food': [255, 215, 0],
};

export const KEY_BINDINGS = {
  'up': ['ArrowUp', 'w', 'W'],
  'down': ['ArrowDown', 's', 'S'],
  'left': ['ArrowLeft', 'a', 'A'],
  'right': ['ArrowRight', 'd', 'D']
};
