import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // apiUrl = [
  //   {
  //     "username": "admin",
  //     "password": "password123"
  //   },
  //   {
  //     "username": "user",
  //     "password": "password456"
  //   }
  // ]; 

  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   // Using 'of' to return an observable
  //   const user = this.apiUrl.find(user => user.username === username && user.password === password);
  //   return of(user);  // Return an observable with the user or null if not found
  // }

  // // Method to store the token in local storage
  // storeToken(token: string): void {
  //   localStorage.setItem('authToken', token);
  // }

  // // Method to check if the user is logged in
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('authToken');
  // }

  // // Method to clear the token (logout)
  // logout(): void {
  //   localStorage.removeItem('authToken');
  // }
}
