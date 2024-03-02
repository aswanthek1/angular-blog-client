import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Blogs } from '../../shared/models/blogModel';
import { ActivatedRoute, ParamMap, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoBackButtonComponent } from '../../shared/components/go-back-button/go-back-button.component';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [IconComponent, RouterOutlet, RouterModule, CommonModule, GoBackButtonComponent],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css'
})
export class ViewBlogComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  blog!:Blogs;
  ngOnInit(): void {
    // this.route.paramMap.subscribe((params:ParamMap) => {
    //   let id = params.get('id');
    //   if(id) {
    //     this.getBlogById(id)
    //   }
    //   else {
    //     console.log('no id')
    //   }
    // })

    // Here we are fetching data before navigating to this page using resolve guard. So we are not calling any api here
    const items = this.route.snapshot.data['blog']
    console.log(items, 'lkj')
    if(!items) {
      this.router.navigate(['not-found'])
    }
    else {
      this.blog = items
    }
  }

  handleButtonClick() {
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  // getBlogById(id:string) {
  //   this.blogService.getBlogById(id).subscribe({
  //     next:(data:any) => {
  //       if(data) {
  //         this.blog = data
  //       }
  //       else {
  //         this.router.navigate(['not-found'])
  //       }
  //     },
  //     error:(error:any) => {
  //       this.router.navigate(['not-found'])
  //       alert(error.message)
  //     }
  //   })
  // }
}
