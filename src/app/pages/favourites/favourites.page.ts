import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Favourites } from "src/app/models/favourites.model";
import { Movie } from "src/app/models/movie.model";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-favourites',
    templateUrl: 'favourites.page.html',
    styleUrls: ['favourites.page.scss'],
    encapsulation: ViewEncapsulation.None,
  })
  export class FavouritesPage {

    favourites: Favourites[];
    isAuthenticated: Observable<boolean>;
    
    constructor(
        private apiService: ApiService,
        private router: Router,
        private dataService: DataService,
        private authenticationService: AuthenticationService,
        private cd: ChangeDetectorRef
    ) {}

    ionViewWillEnter() {
        this.dataService.favourites = null;
        this.isAuthenticated = this.authenticationService.isAuthenticated();
        this.loadFavourites();
    }

    goToAddFavourites() {
        this.router.navigateByUrl('favourites/add');
    }

    editFavourites(favourites: Favourites) {
        this.dataService.favourites = favourites;
        this.router.navigateByUrl('favourites/edit/' + favourites.id);
      }

    deleteMovie(favourites: Favourites, movie: Movie) {
        favourites.movies = favourites.movies.filter(m => m.id !== movie.id),
        favourites.movieIds = favourites.movies.map(m => m.id);
        this.apiService.put('api/favourites', favourites).subscribe(
          () => this.loadFavourites(),
          (err) => {
            console.log(err);
          }
        );
      }

    deleteFavourites(favourites: Favourites) {
        this.apiService.delete('api/favourites/' + favourites.id).subscribe(() => {
            this.favourites = this.favourites.filter(f => f.id !== favourites.id);
            this.cd.detectChanges();
        });
    }

    private loadFavourites() {
        this.apiService.get('api/Favourites').subscribe((response: Array<Favourites>) => {
          this.favourites = response;
        });
    }
  }