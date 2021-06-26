import { ChangeDetectorRef, Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
    selector: 'app-side-menu',
    templateUrl: 'side.menu.component.html',
  })

export class SideMenuComponent {

  isAuthenticated: Observable<boolean>;

  constructor(
    private authenticationService: AuthenticationService, 
    private navController: NavController,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(){
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }
  
  logOut() {
    this.authenticationService.removeToken();
    this.navController.navigateRoot('/');
  }
}