import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
    minDate: string;
    constructor(private http: HttpClient,
      private router: Router
    ) {
      const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    }

    flights: any = [];

    search = {
      origin: '',
      destination: '',
      departureDate: ''
    };
    
    ngOnInit() {
      
    }

    showFlights = false;

    searchFlights() 
    {

      this.http.get(`http://localhost:8081/user/searchFlight/${this.search.origin}/${this.search.destination}/${this.search.departureDate}`)
      .subscribe(data => {
          console.log(data);
          this.flights = data;
          this.showFlights = true;
      });
      console.log('Origin:', this.search.origin);
      console.log('Destination:', this.search.destination);
      console.log('Departure Date:', this.search.departureDate);
    }
    
    logOut(): void {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      this.router.navigate(['/login']);
    }

  
}
