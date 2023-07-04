import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth/auth.service';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockAuthService: any;
  let mockGameService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserId', 'logout']);
    mockGameService = jasmine.createSpyObj('GameService', ['getColor', 'updateColor', 'saveGameSession']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update coin images and score text when flipCoins is called', fakeAsync(() => {
    const side = 'heads';
    component.flipCoins(side);

    expect(component.totalPresses).toBe(1);
    expect(component.flipAnimation.value).toBeTrue();

    tick(1000); // Simulate the passage of 1 second

    expect(component.flipAnimation.value).toBeFalse();

    // We can't know for certain what the coin images will be, as they are based on a random value
    const coinResult1 = component.coinImage1.value;
    const coinResult2 = component.coinImage2.value;

    // Check that the coin images have been updated to a valid value
    expect(coinResult1).toMatch(/..\/assets\/images\/(heads|tails).png/);
    expect(coinResult2).toMatch(/..\/assets\/images\/(heads|tails).png/);

    // Similarly, we can't know for certain what the score text will be
    const scoreText = component.scoreText.value;

    // But we can check that it's one of the possible outcomes
    const validTexts = [
      `Congrats! 🎉 You've got 2 ${side}`,
      `You've got 2 ${coinResult1.split('/')[3].split('.')[0]}. Try again!`,
      "You've got one head and one tail 😕 Try again!"
    ];

    expect(validTexts).toContain(scoreText);

    // If the coin sides were the same and they matched the chosen side, the score should have been incremented
    if (coinResult1 === `../assets/images/${side}.png` && coinResult2 === `../assets/images/${side}.png`) {
      expect(component.score.value).toBe(1);
    }
    // Otherwise, the score should remain 0
    else {
      expect(component.score.value).toBe(0);
    }
  }));

  it('should fetch the correct color from the service on init', () => {
    mockAuthService.getUserId.and.returnValue('1');
    mockGameService.getColor.and.returnValue(of({ color: '#ffffff' }));

    component.ngOnInit();

    expect(component.backgroundColor).toEqual('#ffffff');
  });

  it('should update color when changeBackground is called', () => {
    mockAuthService.getUserId.and.returnValue('1');
    mockGameService.updateColor.and.returnValue(of({ color: '#ffffff' }));

    component.changeBackground('#ffffff');

    expect(mockGameService.updateColor).toHaveBeenCalledWith(1, '#ffffff');
  });


  it('should fetch the correct color from the service on init', () => {
    mockAuthService.getUserId.and.returnValue('1');
    mockGameService.getColor.and.returnValue(of({ color: '#ffffff' }));

    component.ngOnInit();

    expect(component.backgroundColor).toEqual('#ffffff');
  });

  it('should update color when changeBackground is called', () => {
    mockAuthService.getUserId.and.returnValue('1');
    mockGameService.updateColor.and.returnValue(of({ color: '#ffffff' }));

    component.changeBackground('#ffffff');

    expect(mockGameService.updateColor).toHaveBeenCalledWith(1, '#ffffff');
  });

  it('should save the game session and navigate to login when onExit is called', () => {
    mockAuthService.getUserId.and.returnValue('1');
    mockGameService.saveGameSession.and.returnValue(of({}));
    spyOn(window, 'confirm').and.returnValue(true);

    component.onExit();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockGameService.saveGameSession).toHaveBeenCalledWith(1, component.score.value);
  });
});

