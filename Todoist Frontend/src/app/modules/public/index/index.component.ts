import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { WeatherService } from '../../../core/services/weather.service';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,LoginComponent,SignupComponent,RouterLink,HeaderComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  
  weatherData: any;
  location: string = 'Mumbai'; // Default location or fetch dynamically

  constructor(private weatherService: WeatherService) {}


  ngOnInit() {

      this.getWeather();

    if (typeof window !== 'undefined') {
      AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });
    console.log('AOS initialized');
  }
}

getWeather(): void {
  this.weatherService.getWeather(this.location).subscribe(
    data => {
      this.weatherData = data;
      console.log(this.weatherData); // Debug to see the response
    },
    error => 
    {

      console.error('Error fetching weather data:', error);
      alert('Could not fetch weather data. Please try again later.');

    }
  );
}

}
