import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userallbookings',
  templateUrl: './userallbookings.component.html',
  styleUrls: ['./userallbookings.component.css']
})
export class UserallbookingsComponent {
  bookings: any[] = [];

  constructor(private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router  // Inject Router to navigate to other components
  ) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data: any[]) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
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

