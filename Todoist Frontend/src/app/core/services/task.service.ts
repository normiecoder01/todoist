import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  getCompletedTasks,
  getIncompleteTasks,
  Task,
  UpdateTaskCompletionDTO,
  UpdateTaskPercentageDTO,
  UpdateTodoTaskDTO,
} from '../interfaces/task.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private dbUrl = `${environment.apiUrl}/Task`;
  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.dbUrl}/create`, task);
  }

  // Update an existing task
  updateTask(taskId: number, task: UpdateTodoTaskDTO): Observable<Task> {
    return this.http.put<Task>(`${this.dbUrl}/update/${taskId}`, task);
  }

  // Update task percentage with PATCH request
  updateTaskPercentage(
    taskId: number,
    percentage: UpdateTaskPercentageDTO
  ): Observable<Task> {
    const loggedUser = localStorage.getItem('loggedUser');

    if (!loggedUser) {
      console.error('No logged user found in localStorage');
      throw new Error('Authentication token is missing');
    }

    const userObject = JSON.parse(loggedUser); // Parse the stored JSON string
    const token = userObject.token; // Access the token property

    return this.http.patch<Task>(
      `${this.dbUrl}/update-percentage/${taskId}`,
      percentage,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
          'Content-Type': 'application/json',
        },
      }
    );
  }
  // Mark a task as complete or incomplete using PATCH
  updateTaskCompletion(
    taskId: number,
    completionStatus: UpdateTaskCompletionDTO
  ): Observable<Task> {
    const token = localStorage.getItem('loggerUser')
      ? JSON.parse(localStorage.getItem('loggerUser')!).token
      : '';

    return this.http.patch<Task>(
      `${this.dbUrl}/update-completion/${taskId}`,
      completionStatus,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
    
    return this.http.delete(`${this.dbUrl}/delete/${taskId}`);
    console.log("inside delete service")
  }

  // Get incomplete tasks
  getIncompleteTasks(userId: number): Observable<getIncompleteTasks[]> {
    return this.http.get<getIncompleteTasks[]>(`${this.dbUrl}/incomplete-tasks/${userId}`);
  }

  // Get completed tasks
  getCompletedTasks(userId: number): Observable<getCompletedTasks[]> {
    return this.http.get<getCompletedTasks[]>(`${this.dbUrl}/completed-tasks/${userId}`);
  }
  // Method to get the details of a specific task by taskId
  getTaskDetails(taskId: number): Observable<getIncompleteTasks> {
    return this.http.get<getIncompleteTasks>(`${this.dbUrl}/get/${taskId}`);
  }
}
