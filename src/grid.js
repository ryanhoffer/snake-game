import { CELL_SIZE, CANVAS_SIZE, STATE_COLORS } from './config.js';

export class Grid {
    constructor() {
        this.cols = CANVAS_SIZE / CELL_SIZE;
        this.rows = CANVAS_SIZE / CELL_SIZE;
        this.cells = this.createGrid();
    }

    createGrid() {
        let arr = new Array(this.cols);
        for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(this.rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = { 
            state: 'empty',
            color: STATE_COLORS['empty'],
            x: i * CELL_SIZE,
            y: j * CELL_SIZE
            };
        }
        }
        return arr;
    }

    resetCell(x, y) {
        this.cells[x][y] = {
        state: 'empty',
        color: STATE_COLORS['empty'],
        x: x * CELL_SIZE,
        y: y * CELL_SIZE
        };
    }

    getCell(x, y) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
        return this.cells[x][y];
        }
        return null;
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            let cell = this.cells[i][j];
            fill(cell.color[0], cell.color[1], cell.color[2]);
            square(cell.x, cell.y, CELL_SIZE);
        }
        }
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    }