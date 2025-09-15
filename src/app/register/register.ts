import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { UserModel } from '../../models/user.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [MaterialModule, NgIf, NgFor],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  message: string = '';
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      favoriteGenres: [[]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleGenre(genre: string): void {
    const selected = this.registerForm.value.favoriteGenres as string[];
    if (selected.includes(genre)) {
      this.registerForm.patchValue({
        favoriteGenres: selected.filter(g => g !== genre)
      });
    } else {
      this.registerForm.patchValue({
        favoriteGenres: [...selected, genre]
      });
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: Omit<UserModel, 'id'> = this.registerForm.value;
      const success = this.auth.register(userData);
      this.router.navigate(['/']);
    }
  }
}
