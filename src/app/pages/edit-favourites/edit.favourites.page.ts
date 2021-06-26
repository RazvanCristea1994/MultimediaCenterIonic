import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Favourites } from "src/app/models/favourites.model";
import { Movie } from "src/app/models/movie.model";
import { ApiService } from "src/app/services/api.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-edit-favourites',
    templateUrl: 'edit.favourites.page.html',
    encapsulation: ViewEncapsulation.None,
  })
  export class EditFavouritesPage {
    favourites: Favourites;
    movies: Movie[];
  
    constructor(
      private apiService: ApiService,
      private navController: NavController,
      private alertController: AlertController,
      private dataService: DataService,
      private cd: ChangeDetectorRef
    ) { }
  
    ngOnInit() {
      if (this.dataService.favourites == null) {
        this.goToFavouritesList();
      }
  
      this.favourites = this.dataService.favourites;
      this.favourites.movieIds = this.favourites.movies.map(m => m.id);
      this.favourites = this.dataService.favourites;
      this.loadMovies();
    }
  
    addMovie(movie: Movie) {
      this.favourites.movies.push(movie);
      this.favourites.movieIds.push(movie.id)
      this.movies = this.movies.filter(m => m.id !== movie.id);
      this.cd.detectChanges();
    }
  
    deleteMovie(movie: Movie) {
      this.favourites.movies = this.favourites.movies.filter(m => m.id !== movie.id);
      this.favourites.movieIds = this.favourites.movieIds.filter(id => id !== movie.id);
      this.movies.push(movie);
      this.cd.detectChanges();
    }
  
    saveFavourites() {
      this.apiService.put('api/favourites', this.favourites).subscribe(
        () => this.navController.pop(),
        (err) => {
          console.log(err);
        }
      );
    }
  
    private loadMovies() {
        this.apiService.get('api/Movies').subscribe((response: Array<Movie>) => {
          this.movies = response.filter(m => this.favourites.movieIds.indexOf(m.id) == -1);
      });
    }
  
    goToFavouritesList() {
      this.dataService.favourites = null;
      this.navController.navigateBack('/favourites');
    }
  }