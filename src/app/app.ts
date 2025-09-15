import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink, NgIf,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public constructor(
    private router: Router,
    private auth: AuthService,
  ) {};

isLoggedin(): boolean {
  if (this.auth.getCurrentUser()){
    return true;
  }
  return false;
}

  logout() {
    this.auth.logout();
    console.log('Logged out');
  }


}
