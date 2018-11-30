import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.userService.currentUser.subscribe(user => this.user = user);
  }

  showNavbar() {
    return this.router.url !== '/login';
  }

  getCurrentUser() {
    this.userService.getCurrentUser()
      .subscribe(
        () => {
          if (window.location.pathname === '/') {
            this.router.navigateByUrl('/songs');
          }
        },
        () => {
          if (window.location.pathname !== '/login') {
            this.router.navigateByUrl('/login');
            this.snackBar.open('Your session timed out. Please log in again.', 'dismiss');
          }
        },
      );
  }
}
