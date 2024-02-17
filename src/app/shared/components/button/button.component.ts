import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text:string = 'Click';
  @Input() type: string = 'button';
  @Output() commonButtonClick = new EventEmitter<void>()
  handleButtonClick() {
    this.commonButtonClick.emit();
  }
}
