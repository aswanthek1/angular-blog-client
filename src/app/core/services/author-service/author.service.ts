import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../base-url/base-url';
import { HttpClient } from '@angular/common/http';
import { Author } from '../../../shared/models/authorModel';
import { Observable, catchError, throwError } from 'rxjs';

const URL = `${API_BASE_URL}/author/`

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  // private handleError(error:any) {
  //   if(error.status === 0) {
  //     console.error('There is an error with the client network:', error.error)
  //   }
  //   else {
  //     console.error('Server side error: ', error.error)
  //     return throwError(() => new Error(error.error.message))
  //   }

  //   return throwError(() => new Error('Cannot retriev blogs. Please try again'))
  // }

  register(data: any): Observable<any> {
    return this.http.post(`${URL}register`, data)
  }
}
