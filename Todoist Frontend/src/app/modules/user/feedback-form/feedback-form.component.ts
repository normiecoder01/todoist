import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faStar as faSolidStar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent {
  feedback = {
    rating: 0,
    feedbackType: '',
    feedbackText: '',
    email: ''
  };
  successMessage = '';
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  hoverRatingValue: number = 0;
  faSolidStar = faSolidStar;
  faRegularStar = faRegularStar;
  faCheckCircle = faCircleCheck;

  constructor(private http: HttpClient) {}

  setRating(value: number) {
    this.rating = value;
    this.feedback.rating = value;
  }

  hoverRating(value: number) {
    this.hoverRatingValue = value;
  }

  resetHover() {
    this.hoverRatingValue = 0;
  }

  onSubmit() {
    this.http.post('https://localhost:7293/api/feedback/submit', this.feedback)
      .subscribe(response => {
        this.successMessage = 'Thank you for your feedback!';
        this.resetForm();
      }, error => {
        console.error('Error submitting feedback', error);
      });
  }

  resetForm() {
    this.feedback = {
      rating: 0,
      feedbackType: '',
      feedbackText: '',
      email: ''
    };
    this.rating = 0;
  }
}