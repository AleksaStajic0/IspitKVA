import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReservationService } from '../../services/reservation.service';
import { ReservationModel } from '../../models/reservation.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MaterialModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy{
  cartItems: ReservationModel[] = [];
  cartTotal$: Observable<number> = of(0);
  private cartSubscription: Subscription = new Subscription();
  isLoading = false;

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.reservationService.getCart().subscribe(items => {
      this.cartItems = items;
      this.cartTotal$ = this.reservationService.getCartTotal();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  trackByFn(index: number, item: ReservationModel): string {
    return item.id;
  }

  removeFromCart(reservationId: string): void {
    this.reservationService.removeFromCart(reservationId);
    this.snackBar.open('Item removed from cart!', 'Close', {
      duration: 2000,
      panelClass: ['snack-warn']
    });
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      this.isLoading = true;
      
      setTimeout(() => {
        const success = this.reservationService.checkout();
        this.isLoading = false;
        
        if (success) {
          this.snackBar.open('Checkout successful! Your reservations are confirmed.', 'View Reservations', {
            duration: 4000,
            panelClass: ['snack-success']
          }).onAction().subscribe(() => {
            this.router.navigate(['/reservations']);
          });
        } else {
          this.snackBar.open('Checkout failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      }, 1500);
    } else {
      this.snackBar.open('Your cart is empty!', 'Close', {
        duration: 2000,
        panelClass: ['snack-info']
      });
    }
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
}
