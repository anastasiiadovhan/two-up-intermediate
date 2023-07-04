import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { LeaderboardComponent } from './leaderboard.component';
import { GameService } from '../services/game/game.service';
import { AuthService } from '../services/auth/auth.service';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let mockGameService = jasmine.createSpyObj('GameService', ['getLeaderboard', 'getUserHighestScore']);
  let mockAuthService = jasmine.createSpyObj('AuthService', ['getUserId']);

  const leaderboardData = [{userId: '1', score: 10}, {userId: '2', score: 8}];
  const userScoreData = { score: 100 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ LeaderboardComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
  });

  it('should fetch leaderboard on initialization', () => {
    mockGameService.getLeaderboard.and.returnValue(of(leaderboardData));

    fixture.detectChanges(); // Manually trigger ngOnInit()

    expect(component.leaderboard).toEqual(leaderboardData);
    expect(mockGameService.getLeaderboard).toHaveBeenCalled();
  });

  it('should handle error when fetching leaderboard', () => {
    const errorResponse = new ErrorEvent('network error');
    mockGameService.getLeaderboard.and.returnValue(throwError(() => errorResponse));
    mockGameService.getUserHighestScore.and.returnValue(of({}));

    spyOn(console, 'error');
    fixture.detectChanges(); // Manually trigger ngOnInit()

    expect(console.error).toHaveBeenCalledWith('Error fetching leaderboard data', errorResponse);
  });

 
  it('should fetch user score on initialization', () => {
    const userId = '1'; // this should match the type returned by AuthService.getUserId()
    mockAuthService.getUserId.and.returnValue(userId);
    mockGameService.getUserHighestScore.and.returnValue(of(userScoreData));

    fixture.detectChanges(); // Manually trigger ngOnInit()

    expect(component.userScore).toEqual(userScoreData);
    expect(mockGameService.getUserHighestScore).toHaveBeenCalledWith(userId);
  });

  it('should handle error when fetching user score', () => {
    const errorResponse = new ErrorEvent('network error');
    mockGameService.getUserHighestScore.and.returnValue(throwError(() => errorResponse));

    mockGameService.getLeaderboard.and.returnValue(of([]));

    spyOn(console, 'error');
    fixture.detectChanges(); // Manually trigger ngOnInit()

    expect(console.error).toHaveBeenCalledWith('Error fetching user score', errorResponse);
  });
});

