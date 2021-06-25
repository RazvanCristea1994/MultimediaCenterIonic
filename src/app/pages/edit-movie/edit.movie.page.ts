import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Movie, MOVIE_GENRES } from "src/app/models/movie.model";
import { ApiService } from "src/app/services/api.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-edit-movie',
    templateUrl: '../add-movie/add.movie.page.html',
})

export class EditMoviePage {

    MOVIE_GENRES = MOVIE_GENRES;

    movie: Movie;

    constructor(
        private apiService: ApiService,
        private navController: NavController,
        private alertController: AlertController,
        private dataService: DataService
    ) {}

    ngOnInit() {
        if (this.dataService.movie == null) {
            this.goToMoviesList();
        }

        this.movie = this.dataService.movie;
    }

    saveMovie() {
        this.apiService.put('api/movies/' + this.movie.id, this.movie).subscribe(
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
                .create ({
                    header: 'Error',
                    message: message,
                    buttons: ['Ok'],
                })
                .then((alert) => alert.present());
            }
        );
    }

    goToMoviesList() {
        this.dataService.movie == null;
        this.navController.navigateBack('/movies');
    }
}