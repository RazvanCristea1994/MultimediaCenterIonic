import { Review } from "./review.model";

export class Movie {
    id?: number;
    title?: string = '';
    description?: string  = '';
    duration?: number;
    yearOfRelease?: number;
    director?: string  = '';
    watchetd?: boolean;
    rating?: number;
    movieGenre?: MovieGenre;
    userReviews?: Review[];
}

export enum MovieGenre {
    Action, 
    Comedy, 
    Horror, 
    Thriller
}

export const MOVIE_GENRES = [
    "Action", 
    "Comedy", 
    "Horror", 
    "Thriller"
  ];