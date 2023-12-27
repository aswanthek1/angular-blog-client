import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Blogs } from '../../shared/models/blogModel';
import { ActivatedRoute, ParamMap, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlogService } from '../../core/services/blog-service/blog-service.service';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [IconComponent, RouterOutlet, RouterModule],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css'
})
export class ViewBlogComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private blogService:BlogService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      let id = params.get('id');
      if(id) {
        this.getBlogById(id)
      }
      else {
        console.log('no id')
      }
    })
  }
  blog!:Blogs;

  getBlogById(id:string) {
    this.blogService.getBlogById(id).subscribe(
      (data:any) => {
        if(data) {
          this.blog = data
        }
        else {
          this.router.navigate(['not-found'])
        }
      },
      (error:any) => {
        this.router.navigate(['not-found'])
        alert(error.message)
      }
    )
  }
}
