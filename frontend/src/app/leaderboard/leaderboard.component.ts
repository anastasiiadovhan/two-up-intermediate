import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.fetchLeaderboard();
  }

  fetchLeaderboard() {
    this.gameService.getLeaderboard().subscribe(
      data => {
        this.leaderboard = data;
      },
      error => {
        console.error('Error fetching leaderboard data', error);
      }
    );
  }
}
