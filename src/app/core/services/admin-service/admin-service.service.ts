import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../base-url/base-url';
import { Observable, catchError, of } from 'rxjs';
const URL = `${API_BASE_URL}/admin`

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  constructor( private http: HttpClient ) { }

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

    // return throwError(() => new Error('Cannot retriev blogs. Please try again'))
    return of(error);
  }

  getChartDetails():Observable<any> {
    const options = this.getStandardOptions(true)
    return this.http.get(`${URL}/get-chart-data`, options).pipe(catchError(this.handleError))
  }

  getAllAuthors(page:number, limit:number): Observable<any> {
    let options = this.getStandardOptions(true)
    options.params = new HttpParams({///for adding query params
      fromObject: {
        limit: limit,
        page:page
      }
    })
    return this.http.get(`${URL}/get-users`, options).pipe(catchError(this.handleError))
  }
  
}
