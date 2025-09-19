import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Movies } from './movies/movies';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Register } from './register/register';
import { Search } from './search/search';
import { Cart } from './cart/cart';
import { Reservations } from './reservations/reservations';
import { ProfileEdit } from './profile-edit/profile-edit';
import { MovieDetail } from './movie-detail/movie-detail';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: Movies },
  { path: 'movies/:id', component: MovieDetail},
  { path: 'search', component: Search },
  { path: 'cart', component: Cart },
  { path: 'profile', component: Profile },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: 'reservations', component: Reservations },
  {path: 'profile-edit', component: ProfileEdit},
  { path: '**', redirectTo: '' },
];
