import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog-service/blog-service.service';
import { Blogs } from '../../shared/models/blogModel';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FileInputComponent } from '../../shared/components/file-input/file-input.component';
import { AuthContainerComponent } from '../../shared/components/auth-container/auth-container.component';
import { TextEditorComponent } from '../../shared/components/text-editor/text-editor.component';
import { makePreviewImage } from '../../utils/common.utils';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { constants } from '../../../constants/constants';
import { GoBackButtonComponent } from '../../shared/components/go-back-button/go-back-button.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [IconComponent, CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule, LoaderComponent, InputComponent, FileInputComponent, AuthContainerComponent, TextEditorComponent, ButtonComponent, GoBackButtonComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {

  constructor(private blogService:BlogService) {}
  blogForm = new FormGroup({
    tittle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    content: new FormControl('', [Validators.required, Validators.minLength(10)]),
    // author: new FormControl('', [Validators.required, Validators.minLength(2)])
    image: new FormControl('', [Validators.required])
  })

  loading:boolean = false;
  previewImage:string = ''
  constants = constants

  handleImageChange(event:any) {
    console.log(event.target?.files[0], 'event of image')
    this.previewImage = makePreviewImage(event.target.files[0])
    console.log(this.previewImage)
    this.blogForm.patchValue({image:event.target.files[0]})
  }

  submitBlogForm() {
    const formData = this.blogForm.value;
    // return;
    if(this.blogForm.get('tittle')?.hasError('required') || this.blogForm.get('tittle')?.hasError('minlength') || this.blogForm.get('tittle')?.hasError('maxlength')) {
      alert('Title is required and need minimum 2 chars and can have maximum 10 chars')
      return;
    }
    if(this.blogForm.get('content')?.hasError('required') || this.blogForm.get('content')?.hasError('minlength')) {
      alert('Content is required and need minimum 10 chars')
      return;
    }
    if(this.blogForm.get('image')?.hasError('required')) {
      alert('An Image is required.')
      return;
    }
    // if(this.blogForm.get('author')?.hasError('required') || this.blogForm.get('author')?.hasError('minlength')) {
    //   alert('Author is required and need minimum 2 chars')
    //   return;
    // }
    if(this.blogForm.valid) {
      this.loading = true;
      const formDataObj = new FormData();
      formData?.tittle && formDataObj.append('tittle', formData.tittle);
      formData?.content && formDataObj.append('content', formData.content);
      formData?.image && formDataObj.append('image', formData.image);
      this.blogService.addBlog(formDataObj).subscribe({
        next:(data:any) => {
          this.blogForm.setValue({tittle:'', content:'', image:null})
          this.previewImage = ''
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
