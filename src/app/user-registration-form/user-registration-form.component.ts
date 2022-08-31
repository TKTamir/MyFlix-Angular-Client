import { Component, OnInit, Input } from '@angular/core';

//Import used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//Import used to import the API calls from task 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

//Import used to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  /**
   * 
   * @param fetchApiData 
   * @param dilaogReg 
   * @param snackBar 
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dilaogReg: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //Function that's responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    // Logic for a successful user registration goes here(to be implemented)
    console.log(result)
    this.dialogRef.close(); //This will close the modal on success
    this.snackBar.open('User registration successful', 'OK', {
      duration: 2000
    });
    }, (result) => {
      this.snackBar.open('User registration successful', 'OK', {
        duration: 200
      });
    });
  }
  
}

