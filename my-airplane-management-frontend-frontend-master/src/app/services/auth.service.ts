import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:1234/auth/login'; // Replace with your actual backend API

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<string> {
    return this.http.post(this.loginUrl, { userName, password }, { responseType: 'text' }).pipe(
      map(response => {
        console.log('Login response:', response); 
        localStorage.setItem('authToken', response);
        return response;
      })
    );
  }

  // getUsernameFromToken(): string | null {
  //   const token = localStorage.getItem('authToken');

  //   // If token doesn't exist, return null
  //   if (!token) {
  //     console.error('No token found');
  //     return null; // Explicit return of null if token is not found
  //   }

  //   try {
  //     // Decode token and extract username
  //     const payloadBase64 = token.split('.')[1];
  //     const payloadDecoded = JSON.parse(this.decodeBase64Url(payloadBase64));
  //     return payloadDecoded.username;
  //   } catch (error: any) {
  //     console.error('Error decoding token:', error.message); // Use error.message for detailed logging
  //     return null;
  //   }
  // }

  // private decodeBase64Url(base64Url: string): string {
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   return decodeURIComponent(atob(base64).split('').map((c) => {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  // }

  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.username || null;
        console.log(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
