import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthContainerComponent } from '../../../shared/components/auth-container/auth-container.component';
import { Router, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author-service/author.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, CommonModule, FormsModule, ButtonComponent, AuthContainerComponent, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authorForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
  })

  loading:boolean = false;

  router: Router = inject(Router)
  authorService: AuthorService = inject(AuthorService)

  onUserSubmitted() {
    if(!this.authorForm.valid) {
      alert("Please fill all the forms")
      return
    }
    console.log(this.authorForm)
    this.loading = true
    const authorData = this.authorForm.value;
    this.authorService.login(authorData).subscribe({
      next:(data) => {
        this.authorForm.setValue({email:null, password: null})
        alert("Logged in Successfully!")
        console.log(data, ';loggedin')
        localStorage.setItem('token', data?.accessToken)
        this.router.navigate(['blogs'])
      },
      error:(error) => {
        alert(error.error.message)
        this.loading = false
      },
      complete:() => {
        this.loading = false
      }
    })
  }
}
