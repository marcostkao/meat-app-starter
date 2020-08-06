import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/security/login/login.service';
import { User } from '../../security/login/user.model'

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginservice: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginservice.user
  }

  isLoggedIn(): boolean {
    return this.loginservice.isLoggedIn()
  }

  login() {
    this.loginservice.handleLogin()
  }

  logout() {
    this.loginservice.logout()
  }


}
