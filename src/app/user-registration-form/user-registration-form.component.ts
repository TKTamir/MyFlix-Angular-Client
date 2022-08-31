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

  constructor() { }

  ngOnInit(): void {
  }

}
