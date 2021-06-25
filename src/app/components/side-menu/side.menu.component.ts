import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
    selector: 'app-side-menu',
    templateUrl: 'side.menu.component.html',
  })

export class SideMenuComponent {

  constructor(private authenticationService: AuthenticationService, private navController: NavController) {}

  logOut() {
    this.authenticationService.removeToken();
    this.navController.navigateRoot('');
  }
}