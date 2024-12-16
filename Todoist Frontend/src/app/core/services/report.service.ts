import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

    private dbUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getUserReports(): Observable<any[]> {
    console.log("this is get to be implemented")
    return this.http.get<any[]>(this.dbUrl);
  }

//   downloadReport(reportId: number): Observable<Blob> {
//     return this.http.get(${this.dbUrl}/download/${reportId}, { responseType: 'blob' });
//   }
}