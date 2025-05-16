import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private userBaseUrl = 'http://localhost:8082/book'; 
  private  adminBaseUrl="http://localhost:8082/admin/book"; // Common base URL for all endpoints

  constructor(private http: HttpClient) { }

  // Method to get bookings by user name
  getBookingsByUserName(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.userBaseUrl}/getAllBookingsByUserName/${userName}`);
  }

  // Method to get all bookings
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminBaseUrl}/getAllBookings`);
  }

  cancelTicket(bookingId: number): Observable<any> {
    return this.http.delete(`${this.userBaseUrl}/cancelTicket/${bookingId}`);
  }
}
