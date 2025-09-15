import { ReviewModel } from "./reservation.model";

export interface MovieModel {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  director: string;
  actors: string[];
  releaseDate: Date;
  posterUrl: string;
  rating: number; 
  reviews: ReviewModel[];
}