import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { IUserList } from '../interfaces/IUserList';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private dbUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllUser = (pageNumber: number, itemsPerPage: number): Observable<any> => {
    return this.http.get<any>(`${this.dbUrl}/Admin/userlist?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);
  }
  
  GetAllManagers = (pageNumber: number, itemsPerPage: number): Observable<any> => {
    return this.http.get<any>(`${this.dbUrl}/Admin/managerlist?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);
  }

  DeleteUser = (userId: number): Observable<void> => {
    return this.http.delete<void>(`${this.dbUrl}/Admin/delete/${userId}`);
  }

  promoteToManager = (userId: number): Observable<void> => {
    return this.http.patch<void>(`${this.dbUrl}/Admin/promote/${userId}`, {});
  }

  unassignManager = (userId: number): Observable<void> => {
    return this.http.patch<void>(`${this.dbUrl}/Admin/unassign/${userId}`, {});
  }

  demoteToUser = (userId: number): Observable<void> => {
    return this.http.patch<void>(`${this.dbUrl}/Admin/demote/${userId}`, {});
  }

  // Assign a manager to a user
  assignManager = (userId: number, managerId: number): Observable<void> => {
    return this.http.patch<void>(`${this.dbUrl}/Admin/assign/${userId}/${managerId}`, {});
  }

}
