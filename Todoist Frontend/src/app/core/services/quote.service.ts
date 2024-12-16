import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://favqs.com/api/qotd';

  constructor(private http: HttpClient) { }

  getQuoteOfTheDay(): Observable<any> {

    // const headers = new HttpHeaders({
    //   'Authorization': `Token token="${environment.favQsApiKey}"` // Set API key in headers
    // });


    return this.http.get<any>(this.apiUrl);
  }

}
