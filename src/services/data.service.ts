import { Injectable } from "@angular/core";
import { MovieModel } from "../models/movie.model";
import { ScreeningModel } from "../models/screening.model";
import { UserModel } from "../models/user.model";
import { ReservationModel, ReviewModel } from "../models/reservation.model";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private movies: MovieModel[] = [
    {
      id: '1',
      title: 'Avengers: Endgame',
      description: 'After the devastating events of Infinity War, the universe is in ruins.',
      genre: 'Action',
      duration: 181,
      director: 'Anthony Russo, Joe Russo',
      actors: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
      releaseDate: new Date('2019-04-26'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      rating: 4.8,
      reviews: []
    },
    {
      id: '2',
      title: 'The Dark Knight',
      description: 'Batman faces the Joker, a criminal mastermind wreaking havoc on Gotham.',
      genre: 'Action',
      duration: 152,
      director: 'Christopher Nolan',
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      releaseDate: new Date('2008-07-18'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 4.9,
      reviews: []
    },
    {
      id: '3',
      title: 'Inception',
      description: 'A thief who enters people\'s dreams gets his most challenging mission.',
      genre: 'Sci-Fi',
      duration: 148,
      director: 'Christopher Nolan',
      actors: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
      releaseDate: new Date('2010-07-16'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      rating: 4.7,
      reviews: []
    },
    {
      id: '4',
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control.',
      genre: 'Drama',
      duration: 175,
      director: 'Francis Ford Coppola',
      actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      releaseDate: new Date('1972-03-24'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      rating: 4.9,
      reviews: []
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, and others intertwine.',
      genre: 'Crime',
      duration: 154,
      director: 'Quentin Tarantino',
      actors: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
      releaseDate: new Date('1994-10-14'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      rating: 4.6,
      reviews: []
    },
    {
      id: '6',
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over years, finding solace and redemption.',
      genre: 'Drama',
      duration: 142,
      director: 'Frank Darabont',
      actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      releaseDate: new Date('1994-09-23'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      rating: 4.8,
      reviews: []
    },
    {
      id: '7',
      title: 'Forrest Gump',
      description: 'The story of a man with low IQ who accomplishes great things.',
      genre: 'Drama',
      duration: 142,
      director: 'Robert Zemeckis',
      actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
      releaseDate: new Date('1994-07-06'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      rating: 4.5,
      reviews: []
    },
    {
      id: '8',
      title: 'The Matrix',
      description: 'A computer hacker learns the shocking truth about reality.',
      genre: 'Sci-Fi',
      duration: 136,
      director: 'The Wachowskis',
      actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      releaseDate: new Date('1999-03-31'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      rating: 4.7,
      reviews: []
    },
    {
      id: '9',
      title: 'Goodfellas',
      description: 'The story of Henry Hill and his life in the mafia.',
      genre: 'Crime',
      duration: 146,
      director: 'Martin Scorsese',
      actors: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
      releaseDate: new Date('1990-09-21'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      rating: 4.6,
      reviews: []
    },
    {
      id: '10',
      title: 'Titanic',
      description: 'A romance between Jack and Rose aboard the ill-fated ship.',
      genre: 'Romance',
      duration: 195,
      director: 'James Cameron',
      actors: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
      releaseDate: new Date('1997-12-19'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      rating: 4.4,
      reviews: []
    },
    {
      id: '11',
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space.',
      genre: 'Sci-Fi',
      duration: 169,
      director: 'Christopher Nolan',
      actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      releaseDate: new Date('2014-11-07'),
      posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
      rating: 4.6,
      reviews: []
    }
  ];

  private screenings: ScreeningModel[] = [
    { id: '1', movieId: '1', dateTime: new Date(2025, 8, 12, 19, 0), price: 850, availableSeats: 45, totalSeats: 150 },
    { id: '2', movieId: '1', dateTime: new Date(2025, 8, 12, 21, 30), price: 850, availableSeats: 32, totalSeats: 150 },
    { id: '3', movieId: '2', dateTime: new Date(2025, 8, 12, 20, 0), price: 900, availableSeats: 67, totalSeats: 200 },
    { id: '4', movieId: '3', dateTime: new Date(2025, 8, 12, 18, 0), price: 800, availableSeats: 23, totalSeats: 120 },
    
    { id: '5', movieId: '4', dateTime: new Date(2025, 8, 13, 19, 0), price: 750, availableSeats: 89, totalSeats: 180 },
    { id: '6', movieId: '5', dateTime: new Date(2025, 8, 13, 21, 0), price: 800, availableSeats: 45, totalSeats: 160 },
    { id: '7', movieId: '6', dateTime: new Date(2025, 8, 13, 17, 30), price: 700, availableSeats: 78, totalSeats: 140 },
    { id: '8', movieId: '7', dateTime: new Date(2025, 8, 13, 20, 30), price: 750, availableSeats: 56, totalSeats: 170 },
    
    { id: '9', movieId: '8', dateTime: new Date(2025, 8, 14, 15, 0), price: 900, availableSeats: 34, totalSeats: 150 },
    { id: '10', movieId: '8', dateTime: new Date(2025, 8, 14, 18, 0), price: 950, availableSeats: 12, totalSeats: 150 },
    { id: '11', movieId: '9', dateTime: new Date(2025, 8, 14, 21, 0), price: 850, availableSeats: 67, totalSeats: 180 },
    { id: '12', movieId: '10', dateTime: new Date(2025, 8, 15, 16, 0), price: 800, availableSeats: 89, totalSeats: 200 },
    { id: '13', movieId: '11', dateTime: new Date(2025, 8, 15, 19, 30), price: 900, availableSeats: 45, totalSeats: 160 },
    
    { id: '14', movieId: '1', dateTime: new Date(2025, 8, 16, 20, 0), price: 850, availableSeats: 78, totalSeats: 150 },
    { id: '15', movieId: '2', dateTime: new Date(2025, 8, 17, 19, 0), price: 900, availableSeats: 56, totalSeats: 200 },
    { id: '16', movieId: '3', dateTime: new Date(2025, 8, 18, 21, 30), price: 800, availableSeats: 34, totalSeats: 120 },
    { id: '17', movieId: '4', dateTime: new Date(2025, 8, 19, 18, 30), price: 750, availableSeats: 67, totalSeats: 180 },
    { id: '18', movieId: '5', dateTime: new Date(2025, 8, 20, 20, 30), price: 800, availableSeats: 45, totalSeats: 160 },
    { id: '19', movieId: '6', dateTime: new Date(2025, 8, 21, 17, 0), price: 700, availableSeats: 89, totalSeats: 140 },
    { id: '20', movieId: '7', dateTime: new Date(2025, 8, 22, 19, 30), price: 750, availableSeats: 123, totalSeats: 170 }
  ];

  private users: UserModel[] = [
    {
      id: '1',
      firstName: 'Marko',
      lastName: 'Petrović',
      email: 'marko@example.com',
      phone: '060-123-4567',
      address: 'Knez Mihailova 15, Beograd',
      favoriteGenres: ['Action', 'Sci-Fi'],
      password: 'password123'
    },
    {
      id: '2',
      firstName: 'Ana',
      lastName: 'Jovanović',
      email: 'ana@example.com',
      phone: '065-987-6543',
      address: 'Terazije 23, Beograd',
      favoriteGenres: ['Drama', 'Romance'],
      password: 'password123'
    }
  ];

  private reservations: ReservationModel[] = [];
  private reviews: ReviewModel[] = [];

  constructor() {
    this.screenings.forEach(screening => {
      screening.movie = this.movies.find(m => m.id === screening.movieId);
    });
  }

  // Movie metode
  getMovies(): MovieModel[] {
    return [...this.movies];
  }

  getMovieById(id: string): MovieModel | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  // Screening metode
  getScreenings(): ScreeningModel[] {
    return [...this.screenings];
  }

  getScreeningById(id: string): ScreeningModel | undefined {
    return this.screenings.find(screening => screening.id === id);
  }

  getScreeningsByMovieId(movieId: string): ScreeningModel[] {
    return this.screenings.filter(screening => screening.movieId === movieId);
  }

  // User metode
  getUsers(): UserModel[] {
    return [...this.users];
  }

  getUserById(id: string): UserModel | undefined {
    return this.users.find(user => user.id === id);
  }

  getUserByEmail(email: string): UserModel | undefined {
    return this.users.find(user => user.email === email);
  }

  addUser(user: UserModel): void {
    this.users.push(user);
  }

  updateUser(updatedUser: UserModel): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  // Reservation metode
  getReservations(): ReservationModel[] {
    return [...this.reservations];
  }

  getReservationsByUserId(userId: string): ReservationModel[] {
    return this.reservations.filter(reservation => reservation.userId === userId);
  }

  addReservation(reservation: ReservationModel): void {
    this.reservations.push(reservation);
  }

  updateReservation(updatedReservation: ReservationModel): void {
    const index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
  }

  // Review metode
  getReviews(): ReviewModel[] {
    return [...this.reviews];
  }

  getReviewsByMovieId(movieId: string): ReviewModel[] {
    return this.reviews.filter(review => review.movieId === movieId);
  }

  addReview(review: ReviewModel): void {
    this.reviews.push(review);
    this.updateMovieRating(review.movieId);
  }

  private updateMovieRating(movieId: string): void {
    const movieReviews = this.getReviewsByMovieId(movieId);
    const movie = this.getMovieById(movieId);
    if (movie && movieReviews.length > 0) {
      const avgRating = movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length;
      movie.rating = Math.round(avgRating * 10) / 10;
      movie.reviews = movieReviews;
    }
  }
}
