import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { UserService, User } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentUser: User;
  oldPassword: '';
  newPassword: '';
  newPasswordConf: '';

  constructor(
    private user: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.user.currentUser.subscribe(user => this.currentUser = user);
  }

  changePassword() {
    if (this.newPassword !== this.newPasswordConf) {
      throw new Error('Passwords do not match.');
    }

    this.user.updateCurrentUserPassword(this.oldPassword, this.newPassword)
      .subscribe(() => this.snackBar.open('Your password has been updated.', 'dismiss'));
  }

}
