import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviesPage } from './pages/movies/movies.page';
import { OrderPage } from './orders/order.page';
import { AddMoviePage } from './pages/add-movie/add.movie.page';
import { EditMoviePage } from './pages/edit-movie/edit.movie.page';
import { LoginPage } from './pages/login/login.page';
import { FavouritesPage } from './pages/favourites/favourites.page';
import { AddFavouritesPage } from './pages/add-favourites/add.favourites.page';
import { EditFavouritesPage } from './pages/edit-favourites/edit.favourites.page';
import { ViewMoviePage } from './pages/view-movie-page/view.movie.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'movies/view/:id',
    component: ViewMoviePage,
  },
  {
    path: 'movies',
    component: MoviesPage,
  },
  {
    path: 'movies/add',
    component: AddMoviePage,
  },
  {
    path: 'movies/edit/:id',
    component: EditMoviePage,
  },
  {
    path: 'orders',
    component: OrderPage,
  },
  {
    path: 'favourites',
    component: FavouritesPage,
  },
  {
    path: 'favourites/edit/:id',
    component: EditFavouritesPage,
  },
  {
    path: 'favourites/add',
    component: AddFavouritesPage,
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
