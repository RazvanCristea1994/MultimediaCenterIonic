import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './pages/login/login.page';
import { MoviesPage } from './pages/movies/movies.page';
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
import { FavouritesPage } from './pages/favourites/favourites.page';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddFavouritesPage } from './pages/add-favourites/add.favourites.page';
import { EditFavouritesPage } from './pages/edit-favourites/edit.favourites.page';
import { ViewMoviePage } from './pages/view-movie-page/view.movie.page';

@NgModule({
  declarations: [
    //components
    AppComponent, 
    NavbarComponent, 
    SideMenuComponent, 
    //pages
    MoviesPage,
    ViewMoviePage,
    AddMoviePage,
    EditMoviePage,

    OrderPage,

    FavouritesPage,
    AddFavouritesPage,
    EditFavouritesPage,

    LoginPage,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
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
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DataService
    ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
