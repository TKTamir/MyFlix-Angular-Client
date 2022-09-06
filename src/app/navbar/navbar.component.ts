import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /* Navigation Routes */
  
  /** Navigate to Movies Page */
  navMovies(): void {
    this.router.navigate(['movies']);
  }

  //** Navgiate to User Profile Page*/
  navUserProfile(): void {
    this.router.navigate(['profile']);
  }

  
  /** Logout function that's called by the Logout button */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
