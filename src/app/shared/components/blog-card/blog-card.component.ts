import { Component, Input } from '@angular/core';
import { Blogs } from '../../models/blogModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  constructor(private router:Router) {}
  @Input() blog!:Blogs;
  handleBlogClick(id:string) {
    this.router.navigate(['blog', `${id}`])
  }
}
