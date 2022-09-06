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

/**
   * @service POST to an API endpoint to register a new user
   * @param userDetails 
   * @returns a new user object in json format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }


/**
   * @service POST to an API endpoint to log a user in
   * @param userCredentials 
   * @returns user data in json format
   * @function userLogin
   */
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }

 
/**
   *  @service GET to an API endpoint to get all movies
   * @returns array of movies in json format
   * @function getAllMovies
   */
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

/**
   * @service GET to an API endpoint to get a single movies info
   * @param movieId
   * @returns data of one movie
   * @function getMovie
   */
getMovie(movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/${movieId}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * @service GET to an API endpoint to get a single directors info
   * @param name 
   * @returns data of director
   * @function getDirector
   */
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

/**
   * @service GET to an API  endpoint to get data about a genre
   * @returns info about a signle genre
   * @function getGenre
   */
getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/genre/${name}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
  * @service GET to an API endpoint to get data about a single user
  * @param username
  * @returns a user in json format
  * @function getUser
  */
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

/**
  * @service GET to an API endpoint to get data about a single user's favorite movie
  * @param username
  * @returns an object of movie ids
  * @function getFavorite
  */
getFavorite(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * @service PUT to an API endpoint to add a movie to the favorite movies list array
   * @param movieId
   * @returns a user in json format
   * @function addFavoriteMovie
   */
addFavoriteMovie( movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {},  {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  })
  .pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * @service PUT to an API endpoint to update a user's data
   * @param userData
   * @returns a user in json format
   * @function editUser
   */
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
/**
   * @service DELETE to an API endpoint to delete a user
   * @returns none
   * @function deleteUser
   */
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

/**
  * @service DELETE to an API endpoint to remove a movie to the favorite movies list array
  * @param movieID 
  * @returns none
  * @function removeFavoriteMovie
  * 
  */
removeFavoriteMovie(movieId: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {},  {
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
