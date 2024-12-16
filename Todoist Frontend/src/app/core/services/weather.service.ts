import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://api.weatherstack.com/current';
  private apiKey = environment.weatherApiKey; // Store API key in environment file

  constructor(private http: HttpClient) { }


  getWeather(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.apiKey}&query=${location}`);
  }
}
