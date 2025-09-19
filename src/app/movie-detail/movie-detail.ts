import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-movie-detail',
  imports: [MaterialModule, CommonModule, MatProgressBarModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit{
  movieId: string | null = null;
  movie: MovieModel | null = null;

  constructor(private route: ActivatedRoute, private MovieService: MovieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.movieId = params.get('id');
    this.loadMovieDetails();
    });
    
    this.loadMovieDetails();
  }

  loadMovieDetails(): void {
    if (this.movieId) {
      this.MovieService.getMovieById(this.movieId).subscribe(m => {
      this.movie = m || null;
    });
  }}
}