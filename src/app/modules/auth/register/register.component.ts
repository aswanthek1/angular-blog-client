import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from '../../../shared/components/auth-container/auth-container.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthorService } from '../../../core/services/author-service/author.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputComponent, CommonModule, FormsModule, ButtonComponent, AuthContainerComponent, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authorForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  })

  loading:boolean = false

  router: Router = inject(Router)
  authorService: AuthorService = inject(AuthorService)

  onUserSubmitted() {
    if(this.authorForm.valid) {
      const authorData = this.authorForm.value;
      console.log(authorData, 'authordata')
      this.loading = true
      this.authorService.register(authorData).subscribe({
        next:(data) => {
          this.authorForm.setValue({name:'', email: '', password: ''})
          alert("Registerd Successfully!")
          this.router.navigate(['login'])
        },
        error:(error) => {
          alert(error.error.message)
        },
        complete:() => {
          this.loading = false
        }
      })
    }
  }
}
