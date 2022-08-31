import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; //Removed the /internal after rxjs/ as it was causing an error
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://appformovies.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
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
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }
// API GET all movies endpoint  
getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

// API GET a single movie endpoint
getMovie(movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/:${movieId}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API GET Director endpoint
getDirector(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/director/${name}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API GET Genre enpoint
getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/genre/:${name}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API GET User endpoint
getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API GET User's Favorite Movie
getFavorite(movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/:${movieId}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API POST Add a Favorite movie to User's favorites
addFavoriteMovie( movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/username/movies/${movieId}`, {},  {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API PUT Edit a User's info
editUser(userData:any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${username}`, userData,  {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API DELETE a User
deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// API DELETE a movie from User's Favorite movies
removeFavoriteMovie(movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`,  {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
  
}
