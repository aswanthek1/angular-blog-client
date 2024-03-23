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

  private getStandardOptions(withToken:boolean = false, needContentType:boolean = true, contentType:string = 'application/json') : any {
    const token:string|null = localStorage.getItem('token')
    let headerValue:any = {'Content-Type': contentType}
    if(withToken && token) {
      headerValue = {
        'Content-Type': contentType,
        'Authorization': token
      }
      if(!needContentType) {
        headerValue = {'Authorization': token}
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
    return throwError(() => error)
    // return of(error);
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
    const options = this.getStandardOptions(true, false)
    return this.http.post<any>(`${URL}/addBlog`, blog, options).pipe(catchError(this.handleError))
  }

  getBlogById(id:string){
    return this.http.get<Blogs>(`${URL}/getBlog/${id}`).pipe(catchError(this.handleError))
  }

  updateBlog(blog:any, id:string): Observable<any> {
    const options = this.getStandardOptions(true, false)
    return this.http.put<any>(`${URL}/edit/${id}`, blog, options).pipe(catchError(this.handleError))
  }
}
