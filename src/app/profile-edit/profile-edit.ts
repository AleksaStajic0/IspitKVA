import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  imports: [MaterialModule, NgIf, CommonModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css'
})
export class ProfileEdit implements OnInit {
  editForm: FormGroup;
  message: string = '';
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];
  currentUser: UserModel | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      favoriteGenres: [[]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    if (this.currentUser) {
      this.editForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        address: this.currentUser.address,
        favoriteGenres: this.currentUser.favoriteGenres || [],
        password: this.currentUser.password
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleGenre(genre: string): void {
    const selected = this.editForm.value.favoriteGenres as string[];
    if (selected.includes(genre)) {
      this.editForm.patchValue({
        favoriteGenres: selected.filter(g => g !== genre)
      });
    } else {
      this.editForm.patchValue({
        favoriteGenres: [...selected, genre]
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.currentUser) {
      const updatedUserData: UserModel = {
        ...this.editForm.value,
        id: this.currentUser.id
      };
      
      try {
        this.auth.updateUserProfile(updatedUserData);
        this.message = 'Profile updated successfully!';
        
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      } catch (error) {
        this.message = 'Error updating profile. Please try again.';
      }
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }
}