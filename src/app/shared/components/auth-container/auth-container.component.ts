import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.css'
})
export class AuthContainerComponent {
  @Input() formGroupData:FormGroup = new FormGroup({})
  @Input() formTitle:string = ''
  @Input() extraContainerClass:string = 'min-h-full flex flex-col items-center gap-10 py-10 px-7 sm:px-10 md:px-20 relative'
  @Input() needContainer:boolean = true

  @Output() formSubmitted = new EventEmitter<void>()
  onFormSubmit() {
    this.formSubmitted.emit()
  }
}
