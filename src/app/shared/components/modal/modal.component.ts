import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  selectedColor = 'color-1';

  showModal: boolean = false;

  @Output() applyClicked: EventEmitter<string> = new EventEmitter();

  onColorChange(colorValue: string) {
    this.selectedColor = colorValue;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  applyColor() {
    let color;
    switch (this.selectedColor) {
      case 'color-1':
        color = getComputedStyle(document.documentElement).getPropertyValue('--color-1');
        break;
      case 'color-2':
        color = getComputedStyle(document.documentElement).getPropertyValue('--color-2');
        break;
      case 'color-3':
        color = getComputedStyle(document.documentElement).getPropertyValue('--color-3');;
        break;
      case 'color-4':
        color = getComputedStyle(document.documentElement).getPropertyValue('--color-4');;
        break;
      default:
        color = getComputedStyle(document.documentElement).getPropertyValue('--color-1');;
    }
    this.applyClicked.emit(color);
    console.log(color);
  }

}
