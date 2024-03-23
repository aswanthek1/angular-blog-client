import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable } from 'rxjs';
import { BlogState } from '../../../states/blogs/blog.reducer';
import { selectBlogs } from '../../../states/blogs/blog.selector';
import { loadBlogs } from '../../../states/blogs/blog.action';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Blogs } from '../../../shared/models/blogModel';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableContainerComponent } from '../../../shared/components/table-container/table-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, TableContainerComponent, CommonModule],
  templateUrl: './blog-management.component.html',
  styleUrl: './blog-management.component.css'
})
export class BlogManagementComponent implements OnInit, AfterViewInit {
  constructor (private router:Router, private store: Store<AppState> ) {}
  blogs$:Observable<BlogState> = this.store.select(selectBlogs);
  // blogs!:BlogState;

  displayedColumns: string[] = ['image', 'tittle', 'createdAt', 'author'];
  dataSource = new MatTableDataSource<Blogs[]>();

  page:number = 1;
  limit:number = 6;
  loading:boolean = false;
  ngOnInit(): void {
    this.dispatchStore()
    this.getBlogsFromStore()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
  }

  dispatchStore(page=this.page, limit=this.limit) {
    this.store.dispatch(loadBlogs({page:page, limit:limit}))
  }

  getBlogsFromStore(page=this.page, limit=this.limit) {
    this.loading = true;
    // this.store.dispatch(loadBlogs({page:page, limit:limit}))
    this.blogs$.subscribe({
      next:(data:any) => {
        // this.blogs = data
        console.log(data, 'data')
        this.dataSource = data.blogs;
        this.paginator.length = data.count
      },
      error:(error:any) => {
        console.log(error)
        alert("Something went wrong!")
      },
      complete:() => {
        this.loading = false
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.dispatchStore(event.pageIndex+1, event.pageSize)
  }
}
