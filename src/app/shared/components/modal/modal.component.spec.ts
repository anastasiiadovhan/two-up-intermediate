import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should change color', () => {
    const testColor = 'color-3';
    component.onColorChange(testColor);
    expect(component.selectedColor).toEqual(testColor);
  });

  it('should apply color and emit the event', () => {
    spyOn(component.applyClicked, 'emit');
    const testColor = 'color-1';
    component.onColorChange(testColor);
    component.applyColor();
    expect(component.applyClicked.emit).toHaveBeenCalledWith('#ffd075');
  });

});
