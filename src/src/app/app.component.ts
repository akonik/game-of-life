import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from './components/canvas-component/canvas.component';
import { GameLogic } from './game-logic/game.logic';
import { Size } from './models/size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  @ViewChild(CanvasComponent, { static: true }) canvas: CanvasComponent;

  title = 'gameOfLife';
  private cellSize: Size;
  private fieldSize: Size;
  ngOnInit(): void {
    setTimeout(() => { this.initGame(); }, 500);

  }
  private game: GameLogic;
  initGame() {
    this.cellSize = { width: 10, height: 10 };
    this.fieldSize = this.canvas.calculateCellsAmount(this.cellSize.width, this.cellSize.height);
    this.game = new GameLogic(Math.floor(this.fieldSize.width), Math.floor(this.fieldSize.height), Date.now());

    setInterval(() => { this.nextGeneration() }, 250);
  }

  nextGeneration() {
    this.canvas.clearAll();
    this.canvas.Draw(this.game.nextGeneration(), this.fieldSize);
  }

  get generation(){
    return this.game.Generation;
  }
}
