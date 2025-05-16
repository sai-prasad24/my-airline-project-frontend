
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// interface Seat {
//   label: string;
//   selected: boolean;
//   available: boolean;
// }

// @Component({
//   selector: 'app-bookflight',
//   templateUrl: './bookflight.component.html',
//   styleUrls: ['./bookflight.component.css']
// })
// export class BookFlightComponent implements OnInit {
//   flightId: number = 0;
//   username: string = '';
//   bookingData = {
//     noOfSeats: 0
//   };
//   bookingResponse: any;
//   bookingComplete: boolean = false;

//   selectedSeats: string[] = [];
//   seatLayout: Seat[][] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const flightIdParam = this.route.snapshot.paramMap.get('flightId');
//     this.flightId = flightIdParam ? +flightIdParam : 0;
//     this.username = localStorage.getItem('userName') ?? '';

//     // Initialize seat layout with 10 rows of 4 seats each
//     this.initializeSeatLayout();

//     // Load booked seats from backend
//     this.loadBookedSeats();
//   }

//   initializeSeatLayout(): void {
//     for (let row = 1; row <= 10; row++) {
//       this.seatLayout.push(
//         Array.from({ length: 4 }, (_, idx) => ({
//           label: `${String.fromCharCode(64 + row)}${idx + 1}`,
//           selected: false,
//           available: true
//         }))
//       );
//     }
//   }

//   loadBookedSeats(): void {
//     this.http.get<{ bookedSeats: string[] }>(`http://localhost:8081/user/getFlightById/${this.flightId}`)
//       .subscribe(
//         response => {
//           const bookedSeatsSet = new Set(response.bookedSeats);
//           for (const row of this.seatLayout) {
//             for (const seat of row) {
//               seat.available = !bookedSeatsSet.has(seat.label);
//             }
//           }
//         },
//         error => {
//           console.error('Error fetching booked seats:', error);
//         }
//       );
//   }

//   selectSeat(rowIndex: number, seatIdx: number): void {
//     if (this.bookingComplete) return;

//     const seat = this.seatLayout[rowIndex][seatIdx];
//     if (!seat.available) return; // Prevent selecting unavailable seats

//     seat.selected = !seat.selected;

//     if (seat.selected) {
//       this.selectedSeats.push(seat.label);
//     } else {
//       this.selectedSeats = this.selectedSeats.filter(s => s !== seat.label);
//     }

//     this.bookingData.noOfSeats = this.selectedSeats.length;
//   }

//   bookFlight(): void {
//     if (this.bookingComplete || this.bookingData.noOfSeats === 0) return;

//     const { noOfSeats } = this.bookingData;
//     const url = `http://localhost:8082/book/bookings/${this.username}/${this.flightId}/${noOfSeats}`;

//     this.http.post(url, this.selectedSeats).subscribe(
//       (response: any) => {
//         this.bookingResponse = response;
//         this.bookingComplete = true;
//         this.updateAvailableSeats(noOfSeats);
//         localStorage.setItem('bookedSeats', JSON.stringify(this.selectedSeats));
//       },
//       (error: any) => {
//         console.error('Error booking flight:', error);
//         alert('Booking failed. Please try again.');
//       }
//     );
//   }

//   updateAvailableSeats(seatsToReduce: number): void {
//     const url = `http://localhost:8082/flight/updateSeats/${this.flightId}?seatsToReduce=${seatsToReduce}`;

//     this.http.put(url, {}).subscribe(
//       () => {
//         console.log('Seats updated successfully');
//       },
//       (error: any) => {
//         console.error('Error updating seats:', error);
//       }
//     );
//   }

  

//   logOut(): void {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userEmail');
//     this.router.navigate(['/login']);
//   }
// }

//================================================================================================

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../services/booking.service';

interface Seat {
  label: string;
  selected: boolean;
  available: boolean;
}

@Component({
  selector: 'app-bookflight',
  templateUrl: './bookflight.component.html',
  styleUrls: ['./bookflight.component.css']
})
export class BookFlightComponent implements OnInit {
  flightId: number = 0;
  username: string = '';
  bookingData = {
    noOfSeats: 0
  };
  bookingResponse: any;
  bookingComplete: boolean = false;

  selectedSeats: string[] = [];
  seatLayout: Seat[][] = [];
  bookingId=0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const flightIdParam = this.route.snapshot.paramMap.get('flightId');
    this.flightId = flightIdParam ? +flightIdParam : 0;
    this.username = localStorage.getItem('userName') ?? '';

    // Initialize seat layout with 10 rows of 4 seats each
    this.initializeSeatLayout();

    // Load booked seats from backend
    this.loadBookedSeats();
  }

  initializeSeatLayout(): void {
    for (let row = 1; row <= 10; row++) {
      this.seatLayout.push(
        Array.from({ length: 4 }, (_, idx) => ({
          label: `${String.fromCharCode(64 + row)}${idx + 1}`,
          selected: false,
          available: true
        }))
      );
    }
  }

  loadBookedSeats(): void {
    this.http.get<{ bookedSeats: string[] }>(`http://localhost:8081/user/getFlightById/${this.flightId}`)
      .subscribe(
        response => {
          const bookedSeatsSet = new Set(response.bookedSeats);
          for (const row of this.seatLayout) {
            for (const seat of row) {
              seat.available = !bookedSeatsSet.has(seat.label);
            }
          }
        },
        error => {
          console.error('Error fetching booked seats:', error);
        }
      );
  }

  selectSeat(rowIndex: number, seatIdx: number): void {
    if (this.bookingComplete) return;

    const seat = this.seatLayout[rowIndex][seatIdx];
    if (!seat.available) return; // Prevent selecting unavailable seats

    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat.label);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.label);
    }

    this.bookingData.noOfSeats = this.selectedSeats.length;
  }

  bookFlight(): void {
    if (this.bookingComplete || this.bookingData.noOfSeats === 0) return;

    const { noOfSeats } = this.bookingData;
    const url = `http://localhost:8082/book/bookings/${this.username}/${this.flightId}/${noOfSeats}`;

    this.http.post(url, this.selectedSeats).subscribe(
      (response: any) => {
        this.bookingResponse = response;
        this.bookingComplete = true;
        this.updateAvailableSeats(noOfSeats);
        localStorage.setItem('bookedSeats', JSON.stringify(this.selectedSeats));
      },
      (error: any) => {
        console.error('Error booking flight:', error);
        alert('Booking failed. Please try again.');
      }
    );
  }

  updateAvailableSeats(seatsToReduce: number): void {
    const url = `http://localhost:8082/flight/updateSeats/${this.flightId}?seatsToReduce=${seatsToReduce}`;

    this.http.put(url, {}).subscribe(
      () => {
        console.log('Seats updated successfully');
      },
      (error: any) => {
        console.error('Error updating seats:', error);
      }
    );
  }


  cancelTicket(): void {
    if (this.bookingResponse && this.bookingResponse.bookingId) {
      const bookingId = this.bookingResponse.bookingId;
      this.bookingService.cancelTicket(bookingId).subscribe(
        (response) => {
          console.log('Booking canceled successfully:', response);
          alert('Booking canceled successfully.');
          this.resetBooking(); // Reset the booking state in the UI
        },
        (error) => {
          console.error('Error while canceling booking:', error);
          alert('Error while canceling booking. Please try again.');
        }
      );
    } else {
      alert('No bookings found to cancel.');
    }
  }

  resetBooking(): void {
    this.bookingComplete = false;
    this.selectedSeats = [];
    this.bookingData.noOfSeats = 0;
    this.loadBookedSeats(); // Reload seat availability
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
