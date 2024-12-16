import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private dbUrl = environment.apiUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dbUrl}/tasks`);
  }

  // Fetch users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dbUrl}/users`);
  }

  // Assign task to a user
  assignTaskToUser(taskId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.dbUrl}/tasks/${taskId}/assign`, { userId });
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.dbUrl}/tasks/${taskId}`);
  }
}
