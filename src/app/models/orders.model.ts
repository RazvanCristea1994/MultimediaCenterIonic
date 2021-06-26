import { Movie } from "./movie.model";

export class Orders {
    id?: number;
    movies?: Movie[];
    movieIds?: number[];
    date: Date
}