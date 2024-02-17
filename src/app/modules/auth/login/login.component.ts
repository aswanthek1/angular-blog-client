import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthContainerComponent } from '../../../shared/components/auth-container/auth-container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, CommonModule, FormsModule, ButtonComponent, AuthContainerComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authorForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  })

  onUserSubmitted() {
    console.log(this.authorForm)
  }
}
