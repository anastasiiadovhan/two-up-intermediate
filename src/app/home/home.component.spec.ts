import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from './home.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ModalComponent ] // if ModalComponent has its own dependencies, you should consider to mock it
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize score as zero', () => {
    expect(component.score instanceof BehaviorSubject).toBeTruthy();
    expect(component.score.value).toBe(0);
  });

  it('should flip the coins and update the score', () => {
    const initialScore = component.score.value;
    component.flipCoins('heads');
    setTimeout(() => {
      expect(component.score.value).toBeGreaterThanOrEqual(initialScore);
      expect(component.flipAnimation.value).toBeFalsy();
    }, 1000);
  });

  it('should change the background color', () => {
    const color = '#ffffff';
    component.changeBackground(color);
    expect(component.backgroundColor).toBe(color);
  });

  it('should reset the game on exit', () => {
    spyOn(window, 'alert').and.callThrough(); // to prevent actual alert
    component.onExit();
    expect(component.score.value).toBe(0);
    expect(component.totalPresses).toBe(0);
    expect(component.backgroundColor).toBe('#ffd075');
  });
});

