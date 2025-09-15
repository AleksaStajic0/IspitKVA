import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../material.module";
import { CommonModule, NgIf } from '@angular/common';
import { MovieModel } from '../../models/movie.model';
import { ScreeningModel } from '../../models/screening.model';
import { MovieService } from '../../services/movie.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredMovies: MovieModel[] = [];
  recommendedMovies: MovieModel[] = [];
  allMovies: MovieModel[] = [];
  allScreenings: ScreeningModel[] = [];
  loading = true;

  constructor(
    private movieService: MovieService,
    private reservationService: ReservationService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadScreenings();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
    
        this.featuredMovies = movies.slice(0, 4);
        
        this.recommendedMovies = movies.slice(4, 12);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  loadScreenings(): void {
    this.movieService.getScreenings().subscribe({
      next: (screenings) => {
        this.allScreenings = screenings;
      }
    });
  }

  getMovieScreenings(movieId: string): ScreeningModel[] {
    return this.allScreenings.filter(screening => screening.movieId === movieId);
  }

  getNextScreening(movie: MovieModel): ScreeningModel | undefined {
    const movieScreenings = this.getMovieScreenings(movie.id);
    const futureScreenings = movieScreenings
      .filter(s => s.dateTime > new Date())
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    return futureScreenings[0];
  }

  getShortDescription(movie: MovieModel): string {
    return movie.description.length > 120 
      ? movie.description.substring(0, 120) + '...'
      : movie.description;
  }

  getMainActors(movie: MovieModel): string {
    return movie.actors.slice(0, 2).join(', ');
  }

  canAddToCart(movie: MovieModel): boolean {
    const nextScreening = this.getNextScreening(movie);
    return this.auth.getCurrentUser() !== null && 
           nextScreening !== undefined &&
           nextScreening.availableSeats > 0;
  }

  addToCart(movie: MovieModel): void {
    const nextScreening = this.getNextScreening(movie);
    if (!nextScreening) return;

    if (!this.auth.getCurrentUser()) {
      this.snackBar.open('Please login to add items to cart', 'Login', {
        duration: 3000
      }).onAction().subscribe(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    const success = this.reservationService.addToCart(nextScreening);
    if (success) {
      this.snackBar.open('Movie added to cart!', 'Close', {
        duration: 2000
      });
    } else {
      this.snackBar.open('Movie already in cart', 'Close', {
        duration: 2000
      });
    }
  }

  viewMovieDetails(movie: MovieModel): void {
    this.router.navigate(['/movies', movie.id]);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-movie.jpg';
  }
}