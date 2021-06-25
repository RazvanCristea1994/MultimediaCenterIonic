import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MoviesPage } from './movies/movies.page';
import { OrderPage } from './orders/order.page';
import { AddMoviePage } from './pages/add-movie/add.movie.page';
import { EditMoviePage } from './pages/edit-movie/edit.movie.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
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
    path: '',
    redirectTo: 'login',
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
