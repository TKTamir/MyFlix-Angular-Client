import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; //Removed the /internal after rxjs/ as it was causing an error
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 constructor(private http: HttpClient) {}
  //Function to handle Errors, reused in the other api calls
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
 
// API POST User Registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
// API POST User Login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
// API GET all movies endpoint  
getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

// API GET a single movie endpoint

// API GET Director endpoint

// API GET Genre enpoint

// API GET User endpoint

// API GET User's Favorite Movie

// API POST Add a Favorite movie to User's favorites

// API PUT Edit a User's info

// API DELETE a User

// API DELETE a movie from User's Favorite movies

// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
  
}
