import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../base-url/base-url';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Blogs } from '../../../shared/models/blogModel';

const URL = `${API_BASE_URL}/blog`

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  private handleError(error:any) {
    if(error.status === 0) {
      console.error('There is an error with the client network:', error.error)
    }
    else {
      console.error('Server side error: ', error.error)
    }

    return throwError(() => new Error('Cannot retriev blogs. Please try again'))
  }

  getBlogs(page:number, limit:number) : Observable<any> {
    let options = this.getStandardOptions()
    options.params = new HttpParams({///for adding query params
      fromObject: {
        limit: limit
      }
    })
    return this.http.get(`${URL}/getBlogsByPaginage/${page}`, options).pipe(catchError(this.handleError))
  }

  addBlog(blog:any): Observable<any> {
    return this.http.post<any>(`${URL}/addBlog`, blog).pipe(catchError(this.handleError))
  }

  getBlogById(id:string): Observable<Blogs> {
    return this.http.get<Blogs>(`${URL}/getBlog/${id}`).pipe(catchError(this.handleError))
  }
}
