import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.model";

@Injectable()
export class DataService {
    public movie: Movie;
}