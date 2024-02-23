import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../base-url/base-url';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Blogs } from '../../../shared/models/blogModel';

const URL = `${API_BASE_URL}/blog`

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  private getStandardOptions(withToken:boolean = false) : any {
    const token:string|null = localStorage.getItem('token')
    let headerValue:any = {'Content-Type': 'application/json'}
    if(withToken && token) {
      headerValue = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    return {
      headers: new HttpHeaders(headerValue)
    }
  }

  private handleError(error:any) {
    if(error.status === 0) {
      console.error('There is an error with the client network:', error.error)
    }
    else {
      console.error('Server side error: ', error.error)
    }

    // return throwError(() => new Error('Cannot retriev blogs. Please try again'))
    return of(error);
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
    const options = this.getStandardOptions(true)
    return this.http.post<any>(`${URL}/addBlog`, blog, options).pipe(catchError(this.handleError))
  }

  getBlogById(id:string){
    return this.http.get<Blogs>(`${URL}/getBlog/${id}`).pipe(catchError(this.handleError))
  }
}
