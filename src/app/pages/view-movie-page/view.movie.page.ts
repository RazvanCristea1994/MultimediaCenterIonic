import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Review } from 'src/app/models/review.model';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-view-movie',
  templateUrl: 'view.movie.page.html',
})
export class ViewMoviePage {
  isAuthenticated: Observable<boolean>
  movie;
  newReview = new Review();
  reviews = [];

  constructor(
    private apiService: ApiService,
    private navController: NavController,
    private alertController: AlertController,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.dataService.movie == null) {
      this.goToMoviesList();
    }

    this.isAuthenticated = this.authenticationService.isAuthenticated();

    this.movie = this.dataService.movie;
    this.loadReviews(this.movie.id);
  }

  saveReview() {
    this.newReview.movieId = this.movie.id;
    this.apiService.post('api/movies/' + this.movie.id + '/user-reviews', this.newReview)
      .subscribe(
        () => {
          this.reviews.push(this.newReview);
          this.newReview = new Review();
          this.loadReviews(this.movie.id);
          this.cd.detectChanges();
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

  deleteReview(reviewId: number) {
    this.apiService.delete('api/movies/' + this.movie.id + '/user-review/' + reviewId).subscribe(
      () => {
        this.reviews = this.reviews.filter(c => c.id !== reviewId),
          this.cd.detectChanges();
      },
      (err) => {
        let message = 'Error';
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

  private loadReviews(movieId: number) {
    this.apiService.get('api/movies/' + movieId + '/user-reviews').subscribe(response => {
        this.reviews = response.userReviews;
        this.cd.detectChanges();
      });
  }

  goToMoviesList() {
    this.dataService.movie = null;
    this.navController.navigateBack('/movies');
  }
}