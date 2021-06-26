import { ChangeDetectorRef, Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Favourites } from "src/app/models/favourites.model";
import { Movie } from "src/app/models/movie.model";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: 'app-add-favourites',
    templateUrl: 'add.favourites.page.html',
  })
  export class AddFavouritesPage {

    favourites = new Favourites();
    movies: Movie[];

    constructor(
        private apiService: ApiService,
        private navController: NavController,
        private alertController: AlertController,
        private cd: ChangeDetectorRef
    ) { }

    saveFavourites() {
        this.apiService.post('api/Favourites', this.favourites).subscribe(
          () => {
            this.navController.pop();
          },
          (err) => {
            let message = 'Validation error';
            const errorsArray = err?.error?.errors;
            if (errorsArray) {
              message = Object.values(errorsArray)[0] as string;
            } else {
              message = err.error;
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

    ngOnInit() {
        this.loadMovies();
    }

    addMovie(movie: Movie) {
        if(!this.favourites.movies) {
            this.favourites.movies = [];
        }
        this.favourites.movies.push(movie);

        if(!this.favourites.movieIds) {
            this.favourites.movieIds = [];
        }
        this.favourites.movieIds.push(movie.id);

        this.movies = this.movies.filter(m => m.id != movie.id);
        this.cd.detectChanges();
    }

    deleteMovie(movie: Movie) {
        this.favourites.movies = this.favourites.movies.filter(m => m.id !== movie.id);
        this.favourites.movieIds = this.favourites.movieIds.filter(id => id !== movie.id);
        this.movies.push(movie);
        this.cd.detectChanges();
    }

    private loadMovies(){
        this.apiService.get('api/movies').subscribe((response: Movie[]) => {
          this.movies = response;
        });
    }

    goToFavouritesList() {
        this.navController.navigateBack('/favourites');
      }
  }