import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileSvgComponent } from './file-svg/file-svg.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [FileSvgComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css'
})
export class FileInputComponent {
  @Input() extraContainerClasses:string = ''
  @Input() image:any = null
  @Input() control = new FormControl()
  @Output() imageChange = new EventEmitter<any>()

  handleImageChange(event: Event) {
    this.imageChange.emit(event)
  }
}
