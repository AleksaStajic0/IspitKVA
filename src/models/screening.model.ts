import { MovieModel } from "./movie.model";

export interface ScreeningModel {
  id: string;
  movieId: string;
  movie?: MovieModel;
  dateTime: Date;
  price: number;
  availableSeats: number;
  totalSeats: number;
}