import { Injectable } from "@angular/core";
import { Favourites } from "../models/favourites.model";
import { Movie } from "../models/movie.model";
import { Orders } from "../models/orders.model";
import { OrderPage } from "../orders/order.page";

@Injectable()
export class DataService {
    public movie: Movie;
    public order: Orders;
    public favourites: Favourites;
}