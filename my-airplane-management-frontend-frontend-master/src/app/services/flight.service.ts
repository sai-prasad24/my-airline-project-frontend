import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'http://localhost:8081/admin';

  constructor(private http: HttpClient) { }

  // POST: Add a new flight
  addFlight(flight: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addFlight`, flight);
  }

  // GET: Get a flight by ID
  getFlightById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFlightById/${id}`);
  }

  // GET: Get all flights
  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllFlights`);
  }

  // PUT: Update a flight
  updateFlight(id: number, flight: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateFlight/${id}`, flight);
  }

  // DELETE: Delete a flight
  deleteFlight(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteFlight/${id}`);
  }
}
