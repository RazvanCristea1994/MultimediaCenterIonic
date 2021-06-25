import { Component } from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
    selector: 'app-order',
    templateUrl: 'order.page.html'
  })

export class OrderPage {

    order;

    constructor(private apiService: ApiService) {}

    ionViewWillEnter() {
        this.apiService.get('api/orders').subscribe((response) => {
            this.order = response;
        });
    }
}