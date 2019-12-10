import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cell } from 'src/app/game-logic/game.logic';
import { Size } from 'src/app/models/size';

@Component({
    selector: 'app-canvas',
    templateUrl: 'canvas.component.html'
})
export class CanvasComponent implements OnInit {

    container: HTMLElement;

    constructor() { }

    width = 500;
    height = 500;

    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    context: CanvasRenderingContext2D;

    ngOnInit() {
        this.container = document.getElementById("canvasContainer");
        this.height = this.container.clientHeight;
        this.width = this.container.clientWidth;

        var canvas = this.canvas.nativeElement;
        this.context = canvas.getContext("2d");
    }

    calculateCellsAmount(cellWidht: number, cellHeight: number): Size {
        return {
            width: this.width / cellWidht,
            height: this.height / cellHeight
        }
    }

    Draw(cells: Cell[], cellSize: Size) {
        const h = this.height / cellSize.height;
        const w = this.width / cellSize.width;
        const step = 0.5;
        let startX = 0 - step / 2;
        let startY = 0 - step / 2;

        cells.forEach(cell => {
            if (cell.alive) {
                let x = startX + cell.x * w + step;
                let y = startY + cell.y * h + step;

                this.drawRect(x, y, w - step, h - step, '#777b7e', step);
            }


        });
    }


    drawRect(x: number, y: number, width: number, height: number, color: string, step) {
        this.context.beginPath();
        this.context.lineWidth = 5;
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    clearAll() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}