import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; //Movies returned from the API will be stored here, similiar to State in React
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService, //FetchApiDatService calls the api and returns movies.
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { } 

  //Lifecycle hook that's being called with the getMovies function after Angular finishes creating the component
ngOnInit(): void {
  this.getMovies();
}
//Function calls the api and returns the movies in the state of this.movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }
// Function calls the api and returns the FavoriteMovies array
  getFavoriteMovies(): void {
    this.fetchApiData.getFavorite().subscribe((response: any) => {
      this.favoriteMovies = response;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

// Function checks if a movie is included in the FavoriteMovies array
isFav(id: string): boolean {
  return this.favoriteMovies.includes(id)
}

// Function opens the Genre dialog and displays its details
openGenreDialog(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '400px'
  });
}

//Function opens the Director dialog and displays its details
openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birth: birth,
      Death: death,
    },
    // Assign dialog width
    width: '400px'
  });
}

//Function to open the Synopsis dialog and show the movies details
openSynopsisDialog(title: string, description: string): void {
  this.dialog.open(SynopsisComponent, {
    data: {
      Title: title,
      Description: description,
    },
    
    width: '400px'
  });
}

//Function to add a movie to users favorites
addToFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}

//Function to remove a movie from users favorites
removeFromFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}


}

