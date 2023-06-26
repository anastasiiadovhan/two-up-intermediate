import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, interval, take } from 'rxjs';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { AuthService } from '../services/auth/auth.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';


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

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private router: Router
  ) { }


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
    const userId = this.authService.getUserId();
    
    // Check if userId is not undefined
    if(userId !== undefined) {
      // Convert userId to number
      const userIdNumber = Number(userId);
  
      // Save the game session
      this.gameService.saveGameSession(userIdNumber, this.score.value).subscribe({
        next: (response) => {
          this.authService.logout();
          this.router.navigate(['/login']);
          console.log('Game session saved!', response);
        },
        error: (error) => {
          console.error('Error saving game session', error);
        }
      });
    } else {
      // Handle the undefined userId case here
      console.error('User ID is undefined');
    }
  }
  
}
