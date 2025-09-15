import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReservationModel, ReviewModel } from '../models/reservation.model';
import { ScreeningModel } from '../models/screening.model';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private cartSubject = new BehaviorSubject<ReservationModel[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private data: DataService,
    private authService: AuthService
  ) {
    this.loadCartFromStorage();
  }

  addToCart(screening: ScreeningModel): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return false;
    }

    const reservation: ReservationModel = {
      id: this.generateReservationId(),
      userId: currentUser.id,
      screeningId: screening.id,
      screening: screening,
      status: 'reserved',
      reservationDate: new Date()
    };

    const currentCart = this.cartSubject.value;
    const existingReservation = currentCart.find(r => r.screeningId === screening.id);
    
    if (existingReservation) {
      return false; // Already in cart
    }

    const updatedCart = [...currentCart, reservation];
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
    return true;
  }

  removeFromCart(reservationId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(r => r.id !== reservationId);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  getCart(): Observable<ReservationModel[]> {
    return this.cart$;
  }

  getCartTotal(): Observable<number> {
    const total = this.cartSubject.value.reduce((sum, reservation) => 
      sum + (reservation.screening?.price || 0), 0
    );
    return of(total);
  }

  checkout(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return false;
    }

    const cartItems = this.cartSubject.value;
    cartItems.forEach(reservation => {
      this.data.addReservation(reservation);
    });

    this.clearCart();
    return true;
  }

  getUserReservations(userId: string): Observable<ReservationModel[]> {
    return of(this.data.getReservationsByUserId(userId));
  }

  updateReservationStatus(reservationId: string, status: 'reserved' | 'watched' | 'cancelled'): void {
    const reservation = this.data.getReservations().find(r => r.id === reservationId);
    if (reservation) {
      reservation.status = status;
      this.data.updateReservation(reservation);
    }
  }

  addReview(reservationId: string, rating: number, comment: string): void {
    const reservation = this.data.getReservations().find(r => r.id === reservationId);
    const currentUser = this.authService.getCurrentUser();
    
    if (reservation && currentUser && reservation.status === 'watched') {
      
      reservation.rating = rating;
      reservation.review = comment;
      this.data.updateReservation(reservation);

      const review: ReviewModel = {
        id: this.generateReviewId(),
        userId: currentUser.id,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        movieId: reservation.screening!.movieId,
        rating: rating,
        comment: comment,
        date: new Date()
      };

      this.data.addReview(review);
    }
  }

  deleteReservation(reservationId: string): void {
    this.data.deleteReservation(reservationId);
  }

  private clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.cartSubject.next(cart);
    }
  }

  private saveCartToStorage(cart: ReservationModel[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private generateReservationId(): string {
    return 'res_' + Math.random().toString(36).substr(2, 9);
  }

  private generateReviewId(): string {
    return 'rev_' + Math.random().toString(36).substr(2, 9);
  }
}
