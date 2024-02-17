import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { Blogs } from '../../shared/models/blogModel';
// import { BlogService } from '../../core/services/blog-service/blog-service.service';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import { BlogState } from '../../states/blogs/blog.reducer';
import { selectBlogs } from '../../states/blogs/blog.selector';
import { loadBlogs } from '../../states/blogs/blog.action';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, IconComponent, LoaderComponent],
  templateUrl: './Blogs.component.html',
  styleUrl: './Blogs.component.css'
})
export class BlogsComponent implements OnInit {
  constructor (private router:Router, private store: Store<AppState> ) {}

  blogs$:Observable<BlogState> = this.store.select(selectBlogs);
  blogs!:BlogState;
  ngOnInit(): void {
    // this.getAllBlogs(this.pages, this.limit);
    this.getBlogsFromStore()
  }
  
  getBlogsFromStore() {
    this.store.dispatch(loadBlogs({page:this.pages, limit:this.limit}))
    this.blogs$.subscribe({
      next:(data:BlogState) => {
        this.blogs = data
        if(this.pages <= 1) {
          this.previousExtraClass = 'bg-slate-200'
        }
        else {
          this.previousExtraClass = 'bg-slate-300'
        }
        if(data?.totalPage === this.pages) {
          this.nextExtraClasses = 'bg-slate-200'
        }
        else {
          this.nextExtraClasses = 'bg-slate-300'
        }
      },
      error:(error:any) => {
        console.log(error)
        alert("Something went wrong!")
      }
    })

  }
  
  pages:number = 1;
  limit:number = 6;
  // count:number = 0;
  // totalPage:number = 0;
  iconExtraClasses:string = 'sticky right-0'
  previousExtraClass:string = 'bg-slate-300'
  nextExtraClasses:string = 'bg-slate-300'

  // getAllBlogs(pages:number, limit:number) {
  //   this.blogService.getBlogs(pages, limit).subscribe({
  //     next:(data:any) => {
  //       this.blogs = data.data;
  //       // this.count = data.count;
  //       this.totalPage = data.totalPage;
  //       if(pages <= 1) {
  //         this.previousExtraClass = 'bg-slate-200'
  //       }
  //       else {
  //         this.previousExtraClass = 'bg-slate-300'
  //       }
  //       if(data?.totalPage === this.pages) {
  //         this.nextExtraClasses = 'bg-slate-200'
  //       }
  //       else {
  //         this.nextExtraClasses = 'bg-slate-300'
  //       }
  //     },
  //     error:(error:any) => {
  //       alert(error.message)
  //     }
  //   })
  // }

  loadMore(decrease:boolean = false) {
    if(decrease) {
      this.pages = this.pages - 1
    }
    else {
      this.pages = this.pages + 1
    }
    // this.getAllBlogs(this.pages, this.limit)
    this.getBlogsFromStore()
  }

  handleButtonClick(): void {
    this.router.navigate(['create'])
  }

}
