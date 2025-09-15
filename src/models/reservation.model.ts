import { ScreeningModel } from "./screening.model";


export interface ReservationModel {
  id: string;
  userId: string;
  screeningId: string;
  screening: ScreeningModel;
  status: 'reserved' | 'watched' | 'cancelled';
  reservationDate: Date;
  rating?: number;
  review?: string;
}

export interface ReviewModel {
  id: string;
  userId: string;
  userName: string;
  movieId: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface SearchCriteriaModel {
  title?: string;
  genre?: string;
  director?: string;
  actor?: string;
  minDuration?: number;
  maxDuration?: number;
  dateFrom?: Date;
  dateTo?: Date;
  minPrice?: number;
  maxPrice?: number;
  review?: ReviewModel[];
}