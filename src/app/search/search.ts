import { Component } from '@angular/core';
import { SearchCriteriaModel } from '../../models/reservation.model';
import { MovieModel } from '../../models/movie.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DataService } from '../../services/data.service';
import { CommonModule, NgForOf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { ScreeningModel } from '../../models/screening.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search',
  imports: [MaterialModule, NgForOf, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchForm: FormGroup;
  results: MovieModel[] = [];
  allMovies: MovieModel[] = [];
  allScreenings: ScreeningModel[] = [];
  loading = false;
  showFilters = false;

  genres = ['Action', 'Drama', 'Sci-Fi', 'Crime', 'Romance', 'Comedy', 'Horror', 'Thriller'];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private movieService: MovieService,
    private auth: AuthService, 
    private router: Router, 
    private reservationService: ReservationService, 
    private snackBar: MatSnackBar,
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      genre: [''],
      director: [''],
      actor: [''],
      minDuration: [''],
      maxDuration: [''],
      dateFrom: [''],
      dateTo: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.allMovies = this.dataService.getMovies();
    this.allScreenings = this.dataService.getScreenings();
    this.results = [...this.allMovies]; // Show all movies initially
    this.loading = false;
  }

  onSearch(): void {
    this.loading = true;
    const criteria: SearchCriteriaModel = this.searchForm.value;
    this.results = this.filterMovies(criteria);
    this.loading = false;
  }

  onClear(): void {
    this.searchForm.reset();
    this.results = [...this.allMovies];
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  private filterMovies(criteria: SearchCriteriaModel): MovieModel[] {
    let movies = [...this.allMovies];

    // Title
    if (criteria.title?.trim()) {
      movies = movies.filter((m) => 
        m.title.toLowerCase().includes(criteria.title!.toLowerCase().trim())
      );
    }

    // Genre
    if (criteria.genre) {
      movies = movies.filter((m) => m.genre === criteria.genre);
    }

    // Director
    if (criteria.director?.trim()) {
      movies = movies.filter((m) =>
        m.director.toLowerCase().includes(criteria.director!.toLowerCase().trim())
      );
    }

    // Actor
    if (criteria.actor?.trim()) {
      movies = movies.filter((m) =>
        m.actors.some((a) => 
          a.toLowerCase().includes(criteria.actor!.toLowerCase().trim())
        )
      );
    }

    // Duration
    if (criteria.minDuration) {
      movies = movies.filter((m) => m.duration >= criteria.minDuration!);
    }
    if (criteria.maxDuration) {
      movies = movies.filter((m) => m.duration <= criteria.maxDuration!);
    }

    // Release date
    if (criteria.dateFrom) {
      movies = movies.filter((m) => m.releaseDate >= new Date(criteria.dateFrom!));
    }
    if (criteria.dateTo) {
      movies = movies.filter((m) => m.releaseDate <= new Date(criteria.dateTo!));
    }

    // Screening price range
    if (criteria.minPrice || criteria.maxPrice) {
      movies = movies.filter((m) =>
        this.allScreenings.some(
          (s) =>
            s.movieId === m.id &&
            (!criteria.minPrice || s.price >= criteria.minPrice) &&
            (!criteria.maxPrice || s.price <= criteria.maxPrice)
        )
      );
    }

    return movies;
  }

  getMovieScreenings(movieId: string): ScreeningModel[] {
    return this.allScreenings.filter((screening) => screening.movieId === movieId);
  }

  getNextScreening(movie: MovieModel): ScreeningModel | undefined {
    const movieScreenings = this.getMovieScreenings(movie.id);
    const futureScreenings = movieScreenings
      .filter((s) => new Date(s.dateTime) > new Date())
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    return futureScreenings[0];
  }

  getShortDescription(movie: MovieModel): string {
    return movie.description.length > 150
      ? movie.description.substring(0, 150) + '...'
      : movie.description;
  }

  getMainActors(movie: MovieModel): string {
    return movie.actors.slice(0, 3).join(', ');
  }

  canAddToCart(movie: MovieModel): boolean {
    const nextScreening = this.getNextScreening(movie);
    return (
      this.auth.getCurrentUser() !== null &&
      nextScreening !== undefined &&
      nextScreening.availableSeats > 0
    );
  }

  addToCart(movie: MovieModel): void {
    const nextScreening = this.getNextScreening(movie);
    if (!nextScreening) return;

    if (!this.auth.getCurrentUser()) {
      this.snackBar
        .open('Please login to add items to cart', 'Login', {
          duration: 3000,
          panelClass: ['snack-info']
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }

    const success = this.reservationService.addToCart(nextScreening);
    if (success) {
      this.snackBar.open('Movie added to cart!', 'View Cart', {
        duration: 3000,
        panelClass: ['snack-success']
      }).onAction().subscribe(() => {
        this.router.navigate(['/cart']);
      });
    } else {
      this.snackBar.open('Movie already in cart', 'Close', {
        duration: 2000,
        panelClass: ['snack-warn']
      });
    }
  }

  viewMovieDetails(movie: MovieModel): void {
    this.router.navigate(['/movies', movie.id]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x450/424242/ffffff?text=No+Image';
  }

  formatDateTime(dateTime: Date): string {
    if (!dateTime) return 'N/A';
    const date = new Date(dateTime);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getFormattedDuration(duration?: number): string {
    if (!duration) return 'N/A';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  trackByFn(index: number, item: MovieModel): string {
    return item.id;
  }
}
