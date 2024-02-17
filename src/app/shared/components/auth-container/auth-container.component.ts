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

  @Output() formSubmitted = new EventEmitter<void>()
  onFormSubmit() {
    this.formSubmitted.emit()
  }
}
