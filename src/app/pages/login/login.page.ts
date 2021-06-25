import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationResponse } from "src/app/models/authentication.model";
import { Login } from "src/app/models/login.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    encapsulation: ViewEncapsulation.None,
  })

export class LoginPage {

  loginData = new Login();

  constructor(private router: Router, private apiSerice: ApiService, private authService: AuthenticationService) {}

  logIn() {
    this.apiSerice
    .post('api/authentication/login', this.loginData)
    .subscribe((response: AuthenticationResponse) => {
      this.authService.saveToken(response.token);
      this.router.navigateByUrl('/movies');
    });
  }
}

