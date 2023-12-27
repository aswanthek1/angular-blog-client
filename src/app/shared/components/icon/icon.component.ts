import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  constructor() {}
  @Input() iconSrc:string = '';
  @Input() extraClasses:any;
  @Input() iconClass:string = '';
  @Output() buttonClick  = new EventEmitter<void>()
  handleIconClicked():void {
    this.buttonClick.emit()
  }
}
