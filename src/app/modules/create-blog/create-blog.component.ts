import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog-service/blog-service.service';
import { Blogs } from '../../shared/models/blogModel';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [IconComponent, CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule, LoaderComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {

  constructor(private blogService:BlogService) {}

  blogForm = new FormGroup({
    tittle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    content: new FormControl('', [Validators.required, Validators.minLength(10)]),
    author: new FormControl('', [Validators.required, Validators.minLength(2)])
  })

  loading:boolean = false;

  submitBlogForm() {
    const formData = this.blogForm.value;
    if(this.blogForm.get('tittle')?.hasError('required') || this.blogForm.get('tittle')?.hasError('minlength') || this.blogForm.get('tittle')?.hasError('maxlength')) {
      alert('Title is required and need minimum 2 chars and can have maximum 10 chars')
      return;
    }
    if(this.blogForm.get('content')?.hasError('required') || this.blogForm.get('content')?.hasError('minlength')) {
      alert('Content is required and need minimum 10 chars')
      return;
    }
    if(this.blogForm.get('author')?.hasError('required') || this.blogForm.get('author')?.hasError('minlength')) {
      alert('Author is required and need minimum 2 chars')
      return;
    }
    if(this.blogForm.valid) {
      this.loading = true;
      this.blogService.addBlog(formData).subscribe({
        next:(data:any) => {
          this.blogForm.setValue({tittle:'', content:'', author:""})
          this.loading = false;
          alert('Blog Added Successfully!')
        },
        error:(error:any) => {
          this.loading = false;
          alert(error.message)
        },
        complete:() => {
          this.loading = false
        }
      })
    }
  }

}
