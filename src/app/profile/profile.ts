import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserModel } from '../../models/user.model';
import { MaterialModule } from '../material.module';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [MaterialModule, NgIf, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  user?: UserModel;
  
  constructor(private dataService: DataService, private auth: AuthService) { }
  get favoriteGenres(): string {
  return this.user?.favoriteGenres?.join(', ') || 'N/A';
}


  ngOnInit(): void {

    const currentUser = this.auth.getCurrentUser();
    

    if (currentUser) {
      this.user = this.dataService.getUserById(currentUser.id);
    } else {
    }
  }
  isLoggedin(): boolean {
  if (this.auth.getCurrentUser()){
    return true;
  }
  return false;
}

}
