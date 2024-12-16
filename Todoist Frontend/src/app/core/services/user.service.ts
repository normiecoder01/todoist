import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User } from '../interfaces/user';
import { ILoginCredential } from '../interfaces/ILoginCredential';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { IRegisterDto } from '../interfaces/IRegisterDto';
import { IUserList } from '../interfaces/IUserList';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  Register(registerData : IRegisterDto):Observable<void>{
    return this.http.post<void>(`${this.dbUrl}/Auth/register`, registerData);
  }

  Login(loginCredential : ILoginCredential): Observable<ILoggedUser>{
    return this.http.post<ILoggedUser>(`${this.dbUrl}/Auth/login`, loginCredential);
  }

   // Fetch all users for dropdown list
   getAllUsers(): Observable<IUserList[]> {
    return this.http.get<IUserList[]>(`${this.dbUrl}/User/all-users`);
  }

  // signup(user: any): Observable<any> {
  //   return this.http.post(`${this.dbUrl}/users`, user);
  // }

   // This should now hit the correct API endpoint
   getUsers = (): Observable<IUserList[]> => {
    return this.http.get<IUserList[]>(`${this.dbUrl}/User/all-users`);
  }
  UpdateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.dbUrl}/users/${user.id}`, user);
  }


//   deleteUser(userId: number): Observable<void> {
//     return this.http.delete<void>(${this.apiUrl}/${userId});
//   }



    // Store token in localStorage
    setToken(token: string) {
      localStorage.setItem('auth_token', token);
    }
  
    // Retrieve the token
    getToken() {
      return localStorage.getItem('auth_token');
    }
  
    // Check if the user is authenticated
    isAuthenticated(): boolean {
      return !!this.getToken();
    }
  
    logout() {
      localStorage.removeItem('auth_token');
    }

}
