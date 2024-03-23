import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Blogs } from '../../shared/models/blogModel';
import { ActivatedRoute, ParamMap, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoBackButtonComponent } from '../../shared/components/go-back-button/go-back-button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import { selectAuthor } from '../../states/author/author.selector';
import { AuthorState } from '../../states/author/author.reducer';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [IconComponent, RouterOutlet, RouterModule, CommonModule, GoBackButtonComponent],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css'
})
export class ViewBlogComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {}
  author$: Observable<AuthorState> = this.store.select(selectAuthor)
  author!:AuthorState
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
    this.getBlogBeforeLoading()

    // Taking autor from redux
    this.getAuthorFromState();
  }

  getAuthorFromState() {
    this.author$.subscribe({
      next:(data: AuthorState) => {
        this.author = data
      },
      error: (error) => {
        console.log(error, 'author error in navbar')
      }
    })
  }

  getBlogBeforeLoading() {
    const items = this.route.snapshot.data['blog']
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
