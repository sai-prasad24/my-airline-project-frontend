// import { Component, OnInit } from '@angular/core';
// import { BookingService } from '../services/booking.service'; // Adjust the path based on your service location
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-userbookings',
//   templateUrl: './userbookings.component.html',
//   styleUrls: ['./userbookings.component.css']
// })
// export class UserbookingsComponent implements OnInit {

//   bookings: any[] = [];
//   userName: string = localStorage.getItem('userName') || '';

  
 

//   constructor(private bookingService: BookingService, private route: ActivatedRoute,private router:Router) { }

//   ngOnInit(): void {
//     // Get the username from route parameters
//    // this.userName = this.route.snapshot.paramMap.get('userName') || '';

//     // Fetch the bookings if username is available
//     if (this.userName) {
//       this.bookingService.getBookingsByUserName(this.userName).subscribe(
//         (data: any[]) => {
//           this.bookings = data;
//         },
//         (error) => {
//           console.error('Error fetching bookings:', error);
//         }
//       );
//     } else {
//       console.error('Username not provided in the route');
//     }
  

   
// }




// logOut(): void {
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('userId');
//   localStorage.removeItem('userName');
//   localStorage.removeItem('userRole');
//   localStorage.removeItem('userEmail');
//   this.router.navigate(['/login']);
// }
// }
// =============================================
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../services/booking.service'; // Adjust path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];
  userName: string = '';

  constructor(private bookingService: BookingService, private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') ?? '';
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    const url = `http://localhost:8082/book/getAllBookingsByUserName/${this.userName}`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.bookings = response;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        alert('Error fetching bookings. Please try again.');
      }
    );
  }

  cancelTicket(bookingId: number): void {
    this.bookingService.cancelTicket(bookingId).subscribe(
      (response) => {
        console.log('Booking canceled successfully:', response);
        alert('Booking canceled successfully.');
        this.loadUserBookings(); // Reload the bookings after cancellation
      },
      (error) => {
        console.error('Error while canceling booking:', error);
        alert('Error while canceling booking. Please try again.');
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
