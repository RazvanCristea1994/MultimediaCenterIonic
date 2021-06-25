import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie, MovieGenre } from "../models/movie.model";
import { ApiService } from "../services/api.service";
import { DataService } from "../services/data.service";

@Component({
    selector: 'app-movies',
    templateUrl: 'movies.page.html',
    styleUrls: ['movies.page.scss'],
    encapsulation: ViewEncapsulation.None,
  })

export class MoviesPage {

  movies: Movie[];

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
    ) {}

  ionViewWillEnter() {
    this.loadMovies();
  }

  goToAddMovie() {
    this.router.navigateByUrl('movies/add');
  }

  goToEditMovie(movie: Movie) {
    this.dataService.movie = movie
    this.router.navigateByUrl('movies/edit/' + movie.id);
  }

  deleteMovie(movie: Movie) {
    this.apiService.delete('api/movies/' + movie.id).subscribe(() => {
      this.loadMovies();
    });
  }

  private loadMovies(){
    this.apiService.get('api/movies').subscribe((response: Movie[]) => {
      this.movies = response;
    });
  }
}