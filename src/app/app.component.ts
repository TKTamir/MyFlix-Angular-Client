import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
    //Function that opens the registration dialog when the signup button is clicked
    openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
        //Assigning the dialog a width
        width: '280px'
      }); 
    }
    //Function that opens the login dialog when the signup button is clicked
    openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
        //Assigning the dialog a width
        width: '280px'
      }); 
    }
    //Function that opens the movies dialog after the button is clicked
    openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }
}
