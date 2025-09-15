import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ReservationModel } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservations',
  imports: [MaterialModule, CommonModule,],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css'
})
export class Reservations implements OnInit{
reservations: ReservationModel[] = [];
  filteredReservations: ReservationModel[] = [];
  selectedStatus: string = 'all';
  statusOptions = [
    { value: 'all', label: 'All Reservations' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'watched', label: 'Watched' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.reservationService.getUserReservations(currentUser.id).subscribe(reservations => {
        this.reservations = reservations.sort((a, b) => 
          new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime()
        );
        this.filterReservations();
      });
    }
  }

  filterReservations(): void {
    if (this.selectedStatus === 'all') {
      this.filteredReservations = [...this.reservations];
    } else {
      this.filteredReservations = this.reservations.filter(r => r.status === this.selectedStatus);
    }
  }

  onStatusChange(): void {
    this.filterReservations();
  }

  markAsWatched(reservationId: string): void {
    this.reservationService.updateReservationStatus(reservationId, 'watched');
    this.loadReservations();
    this.snackBar.open('Movie marked as watched!', 'Close', {
      duration: 2000,
      panelClass: ['snack-success']
    });
  }

  cancelReservation(reservationId: string): void {
    const reservation = this.reservations.find(r => r.id === reservationId);
    if (reservation && this.canCancelReservation(reservation)) {
      this.reservationService.updateReservationStatus(reservationId, 'cancelled');
      this.loadReservations();
      this.snackBar.open('Reservation cancelled successfully!', 'Close', {
        duration: 2000,
        panelClass: ['snack-warn']
      });
    } else {
      this.snackBar.open('Cannot cancel this reservation!', 'Close', {
        duration: 2000,
        panelClass: ['snack-error']
      });
    }
  }

  canCancelReservation(reservation: ReservationModel): boolean {
    if (reservation.status !== 'reserved') return false;
    
    const screeningDate = new Date(reservation.screening?.dateTime);
    const now = new Date();
    const timeDiff = screeningDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    return hoursDiff > 2;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'reserved': return 'primary';
      case 'watched': return 'accent';
      case 'cancelled': return 'warn';
      default: return 'primary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'reserved': return 'event_seat';
      case 'watched': return 'check_circle';
      case 'cancelled': return 'cancel';
      default: return 'help';
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

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  trackByFn(index: number, item: ReservationModel): string {
    return item.id;
  }

  getReservationStats() {
    return {
      total: this.reservations.length,
      reserved: this.reservations.filter(r => r.status === 'reserved').length,
      watched: this.reservations.filter(r => r.status === 'watched').length,
      cancelled: this.reservations.filter(r => r.status === 'cancelled').length
    };
  }
}
