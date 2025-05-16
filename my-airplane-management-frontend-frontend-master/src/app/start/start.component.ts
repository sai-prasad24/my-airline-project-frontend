import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  minDate: string;
  constructor(private http: HttpClient,
              private router: Router
  ) { 
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  search = {
    origin: '',
    destination: '',
    departureDate: ''
  };

  flights: any[] = [];
  showFlights = false;

  searchFlights() {
    if (this.search.origin && this.search.destination && this.search.departureDate) {
      this.http.get(`http://localhost:8081/user/searchFlight/${this.search.origin}/${this.search.destination}/${this.search.departureDate}`)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.flights = data;
          this.showFlights = true;
        },
        error => {
          console.error('Error fetching flights:', error);
          this.showFlights = false;
        }
      );
    } else {
      console.warn('Please fill in all search fields.');
    }
  }

  redirectToLogin() {
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }
}
