import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from './components/canvas-component/canvas.component';
import { GameLogic } from './game-logic/game.logic';
import { Size } from './models/size';
import { MatSliderChange } from '@angular/material/slider';

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
  private menuOpened: boolean = true;
  seed: number;
  speed: number = 2;

  ngOnInit(): void {
    setTimeout(() => { this.initGame(); }, 500);

  }
  private game: GameLogic;
  initGame() {
    this.cellSize = { width: 2, height: 2 };
    this.fieldSize = this.canvas.calculateCellsAmount(this.cellSize.width, this.cellSize.height);
    this.game = new GameLogic(Math.floor(this.fieldSize.width), Math.floor(this.fieldSize.height), Date.now());


  }

  get isMenuOpened() {
    return this.menuOpened;
  }
  interval;
  start() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if(!this.menuOpened)
        this.nextGeneration();
        console.log(this.speed);
    }, (1500/(this.speed)));
  }

  onSeedChanged(event: MatSliderChange) {
    this.canvas.clearAll();
    this.canvas.Draw(this.game.generateField(event.value), this.fieldSize);
    this.seed = event.value;
  }

  onSpeedChanged(event: MatSliderChange) {
    this.speed = event.value;
  }

  nextGeneration() {
    this.canvas.clearAll();
    this.canvas.Draw(this.game.nextGeneration(), this.fieldSize);
  }

  startGame(event) {
    event.preventDefault();
    this.menuOpened = false;
    this.start();
  }

  openMenu(){
    this.menuOpened = true;
    console.log('111');
  }

  closeMenu(){
    this.menuOpened = false;
  }

  get generation() {
    return this.game.Generation;
  }
}
