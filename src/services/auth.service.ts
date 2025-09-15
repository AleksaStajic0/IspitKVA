import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private data: DataService) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): boolean {
    const user = this.data.getUserByEmail(email);
    if (user && user.password === password) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  register(userData: Omit<UserModel, 'id'>): boolean {
    // Check if user already exists
    if (this.data.getUserByEmail(userData.email)) {
      return false; // User already exists
    }

    const newUser: UserModel = {
      ...userData,
      id: this.generateUserId()
    };

    this.data.addUser(newUser);
    this.setCurrentUser(newUser);
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): UserModel | null {
    return this.currentUserSubject.value;
  }

  updateUserProfile(updatedUser: UserModel): void {
    this.data.updateUser(updatedUser);
    this.setCurrentUser(updatedUser);
  }

  private setCurrentUser(user: UserModel): void {
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }
}
