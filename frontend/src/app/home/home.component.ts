import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, interval, take } from 'rxjs';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('settingsModal') settingsModal!: ModalComponent;

  score = new BehaviorSubject<number>(0);
  flipAnimation = new BehaviorSubject<boolean>(false);
  coinSide = new BehaviorSubject<string>('');
  coinImage1 = new BehaviorSubject<string>('../assets/images/heads.png');
  coinImage2 = new BehaviorSubject<string>('../assets/images/tails.png');
  backgroundColor = '#ffd075';
  scoreText = new BehaviorSubject<string>('Choose heads or tails to spin');
  totalPresses = 0;

  constructor() { }

  ngOnInit(): void {
  }

  flipCoins(side: string) {
    this.totalPresses++;
    this.flipAnimation.next(true);
    this.coinSide.next(side);
    setTimeout(() => {
      this.flipAnimation.next(false);
      const coinResult1 = Math.random() > 0.5 ? 'heads' : 'tails';
      const coinResult2 = Math.random() > 0.5 ? 'heads' : 'tails';
      this.coinImage1.next(`../assets/images/${coinResult1}.png`);
      this.coinImage2.next(`../assets/images/${coinResult2}.png`);

      let resultMessage = '';
      if (coinResult1 === coinResult2) {
        if(coinResult1 == side) {
          this.score.next(this.score.value + 1);
          resultMessage = `Congrats! 🎉 You've got 2 ${side}`;
        } else {
          resultMessage = `You've got 2 ${coinResult1}. Try again!`;
        }
      } else {
        resultMessage = "You've got one head and one tail 😕 Try again!";
      }
      this.scoreText.next(resultMessage);
    }, 1000);
  }

  openModal() {
    this.settingsModal.openModal();
  }

  changeBackground(color: string) {
    this.backgroundColor = color;
  }

  onExit() {
    const data = `Score: ${this.score.value}, Total presses: ${this.totalPresses}, Color chosen: ${this.backgroundColor}\n`;
    alert(data);
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");
    this.updateTheGame();
  }

  updateTheGame() {
    this.score.next(0);
    this.totalPresses = 0;
    this.backgroundColor = '#ffd075';
    this.scoreText.next("Choose heads or tails to spin");
  }
}
