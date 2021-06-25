import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Movie, MOVIE_GENRES } from "src/app/models/movie.model";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: 'app-add-movie',
    templateUrl: 'add.movie.page.html',
  })

export class AddMoviePage {

  MOVIE_GENRES = MOVIE_GENRES;

  movie = new Movie();

  constructor(private apiService: ApiService, 
    private navController: NavController, 
    private alertController: AlertController) {}

    saveMovie() {
    this.apiService.post('api/movies', this.movie).subscribe(
      () => {
        this.navController.pop();
      },
      (err) => { 
        let message = 'Validation error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
        }
        this.alertController
        .create({
          header: 'Error',
          message: message,
          buttons: ['Ok'],
        })
        .then((alert) => alert.present());
      }
    );
  }

  goToMoviesList() {
    this.navController.navigateBack('/movies');
  }
}