import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog-service/blog-service.service';
import { Blogs } from '../../shared/models/blogModel';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
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
export class CreateBlogComponent implements OnInit {

  constructor(private blogService:BlogService, private route: ActivatedRoute, private router: Router) {}
  text:string = 'Create Blog'
  id:string | null = null
  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.getBlogBeforeLoading()
      this.id = this.route.snapshot.params['id']
      if(this.id) {
        this.text = 'Update Blog'
      }
    }
  }
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
    if(!this.id && !this.previewImage && this.blogForm.get('image')?.hasError('required')) {
      alert('An Image is required.')
      return;
    }
    // if(this.blogForm.get('author')?.hasError('required') || this.blogForm.get('author')?.hasError('minlength')) {
    //   alert('Author is required and need minimum 2 chars')
    //   return;
    // }
    const formDataObj = new FormData();
    formData?.tittle && formDataObj.append('tittle', formData.tittle);
    formData?.content && formDataObj.append('content', formData.content);
    formData?.image && formDataObj.append('image', formData.image);
    if(this.id) {
      this.loading = true;
      this.updateBlog(formDataObj)
    }
    else if(this.blogForm.valid) {
      this.loading = true;
      this.createBlog(formDataObj)
    }
  }

  createBlog(formDataObj: FormData) {
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

  //for editing
  getBlogBeforeLoading() {
    const items = this.route.snapshot.data['blog']
    if(!items && !this.route.snapshot.params['id']) {
      this.router.navigate(['not-found'])
    }
    else {
      this.blogForm.patchValue({tittle: items.tittle, content: items.content})
      this.previewImage = items.image
    }
  }

  updateBlog(formData:FormData) {
    this.blogService.updateBlog(formData, this.id as string).subscribe({
      next:(data) => {
        alert("Blog updated successfully!")
        this.loading = false;
      },
      error:(error) => {
        alert(error?.error?.message || 'Something went wrong.')
        this.loading = false;
      }
    })
  }

}
