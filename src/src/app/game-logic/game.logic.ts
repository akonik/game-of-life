import { makeNoise2D } from "open-simplex-noise";

export class GameLogic {

    private field: Array<Array<Cell>>;
    private generation = 0;
    private width = 0;
    private height = 0;

    constructor(x: number, y: number, seed: number) {
        this.width = x;
        this.height = y;

        this.field = new Array<Array<Cell>>(x);
        for (let i = 0; i < x; i++) {
            this.field[i] = new Array<Cell>();
        }
        this.generateField(seed);
    }

    public generateField(seed: number) {
        const noise2D = makeNoise2D(seed);

        for (let x = 0; x < this.width; x++) {
            this.field[x] = new Array<Cell>();
            for (let y = 0; y < this.height; y++) {
                this.field[x].push(new Cell(x, y, noise2D(x, y) > 0.1));
            }
        }
    }
    
    private prevGeneration: Array<Cell>;
    public nextGeneration(): Array<Cell> {
        let result = new Array<Cell>();

        this.field.forEach(row => row.forEach(cell => {
            let neighbors = this.getNeighbors(cell.x, cell.y);

            let alive = neighbors.filter(f => f.alive).length;
            if (!cell.alive && alive == 3) {
                cell.alive = true;
            }
            else if (alive < 2 || alive > 3) {
                cell.alive = false;
            }

            result.push(cell);

        }));

        this.generation += 1;
        if (this.prevGeneration) {

        }
        this.prevGeneration = result;
        return result;
    }

    private getNeighbors(x, y): Array<Cell> {
        let result = new Array<Cell>();

        this.field[x][y].points.forEach(point => {
            let neighbor = this.getCell(point.x, point.y);
            if (neighbor != null)
                result.push(neighbor);
        });

        return result;
    }

    getCell(x: number, y: number): Cell {
        if (x < 0 || x >= this.width)
            return null;
        if (y < 0 || y >= this.height)
            return null;

        return this.field[x][y];
    }

    get Generation(){
        return this.generation;
    }
}

export class Cell {
    public x: number;
    public y: number;
    public alive: boolean;

    constructor(x: number, y: number, alive: boolean) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    get points(): Array<Point> {
        return [
            //upper
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x, y: this.y - 1 },
            { x: this.x + 1, y: this.y - 1 },
            //midle
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            //bottom
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x, y: this.y + 1 },
            { x: this.x + 1, y: this.y + 1 },

        ]
    }
}

export interface Point {
    x: number;
    y: number;
}