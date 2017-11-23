import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: '';
  password: '';

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(this.username, this.password)
      .subscribe(
        success => console.log('success', success),
        failure => console.log('failure', failure.error),
      );
  }

  ngOnInit() {
  }

}
