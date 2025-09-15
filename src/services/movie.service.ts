import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { ScreeningModel } from '../models/screening.model';
import { SearchCriteriaModel } from '../models/reservation.model';
import { Observable, of} from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private data: DataService) {}

  getMovies(): Observable<MovieModel[]> {
    return of(this.data.getMovies());
  }

  getMovieById(id: string): Observable<MovieModel | undefined> {
    return of(this.data.getMovieById(id));
  }

  getScreenings(): Observable<ScreeningModel[]> {
    return of(this.data.getScreenings());
  }

  getScreeningById(id: string): Observable<ScreeningModel | undefined> {
    return of(this.data.getScreeningById(id));
  }

  getScreeningsByMovieId(movieId: string): Observable<ScreeningModel[]> {
    return of(this.data.getScreeningsByMovieId(movieId));
  }

  searchMovies(criteria: SearchCriteriaModel): Observable<MovieModel[]> {
    let movies = this.data.getMovies();

    if (criteria.title) {
      movies = movies.filter(movie => 
        movie.title.toLowerCase().includes(criteria.title!.toLowerCase())
      );
    }

    if (criteria.genre) {
      movies = movies.filter(movie => 
        movie.genre.toLowerCase().includes(criteria.genre!.toLowerCase())
      );
    }

    if (criteria.director) {
      movies = movies.filter(movie => 
        movie.director.toLowerCase().includes(criteria.director!.toLowerCase())
      );
    }

    if (criteria.actor) {
      movies = movies.filter(movie => 
        movie.actors.some(actor => 
          actor.toLowerCase().includes(criteria.actor!.toLowerCase())
        )
      );
    }

    if (criteria.minDuration) {
      movies = movies.filter(movie => movie.duration >= criteria.minDuration!);
    }

    if (criteria.maxDuration) {
      movies = movies.filter(movie => movie.duration <= criteria.maxDuration!);
    }

    return of(movies);
  }

  searchScreenings(criteria: SearchCriteriaModel): Observable<ScreeningModel[]> {
    let screenings = this.data.getScreenings();

    if (criteria.dateFrom) {
      screenings = screenings.filter(screening => 
        screening.dateTime >= criteria.dateFrom!
      );
    }

    if (criteria.dateTo) {
      screenings = screenings.filter(screening => 
        screening.dateTime <= criteria.dateTo!
      );
    }

    if (criteria.minPrice) {
      screenings = screenings.filter(screening => 
        screening.price >= criteria.minPrice!
      );
    }

    if (criteria.maxPrice) {
      screenings = screenings.filter(screening => 
        screening.price <= criteria.maxPrice!
      );
    }

    return of(screenings);
  }

  getGenres(): string[] {
    const movies = this.data.getMovies();
    const genres = [...new Set(movies.map(movie => movie.genre))];
    return genres.sort();
  }

  getDirectors(): string[] {
    const movies = this.data.getMovies();
    const directors = [...new Set(movies.map(movie => movie.director))];
    return directors.sort();
  }
}
