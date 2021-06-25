import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './pages/login/login.page';
import { MoviesPage } from './movies/movies.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideMenuComponent } from './components/side-menu/side.menu.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddMoviePage } from './pages/add-movie/add.movie.page';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './interceptors/auth.token.interceptor';
import { OrderPage } from './orders/order.page';
import { EditMoviePage } from './pages/edit-movie/edit.movie.page';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    //components
    AddMoviePage,
    AppComponent, 
    NavbarComponent, 
    SideMenuComponent, 
    //pages
    EditMoviePage,
    LoginPage,
    OrderPage, 
    MoviesPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ], 
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     ApiService,
     AuthenticationService,
     DataService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
