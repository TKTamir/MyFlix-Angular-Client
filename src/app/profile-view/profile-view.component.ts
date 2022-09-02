// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialog } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//This import is used to import Angulars Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }
  ngOnInit(): void {
  }

}
