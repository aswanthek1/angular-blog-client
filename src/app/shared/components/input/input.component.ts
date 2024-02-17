import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent{
  @Input() email: boolean = false;
  @Input('placeholder') placeholder: string = '';
  @Input('type') type: string = 'text';
  @Input() label:string = ''
  @Input() name:string = ''
  @Input() value: string|number = ''
  @Input() required: boolean = false
  @Input() control = new FormControl()
  // @Input() formControlName?:FormControlName

}
