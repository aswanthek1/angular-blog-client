import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Blogs } from '../../shared/models/blogModel';
import { BlogService } from '../../core/services/blog-service/blog-service.service';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor (private blogService:BlogService, private router:Router ) {}
  ngOnInit(): void {
    this.getAllBlogs(this.pages, this.limit);
  }
  blogs:Blogs[] = [];
  pages:number = 1;
  limit:number = 6;
  count:number = 0;
  totalPage:number = 0;
  imageSrc:string = '../../../assets/svg/create.svg'
  iconExtraClasses:string = 'sticky right-0'
  previousExtraClass:string = 'bg-slate-300'
  nextExtraClasses:string = 'bg-slate-300'

  getAllBlogs(pages:number, limit:number) {
    this.blogService.getBlogs(pages, limit).subscribe({
      next:(data:any) => {
        this.blogs = data.data;
        this.count = data.count;
        this.totalPage = data.totalPage;
        if(pages <= 1) {
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
        alert(error.message)
      }
    })
  }

  loadMore(decrease:boolean = false) {
    if(decrease) {
      this.pages = this.pages - 1
    }
    else {
      this.pages = this.pages + 1
    }
    this.getAllBlogs(this.pages, this.limit)
  }

  handleButtonClick(): void {
    this.router.navigate(['create'])
  }

}
