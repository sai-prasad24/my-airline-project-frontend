import { Component, OnInit } from "@angular/core";
import { FlightService } from "../services/flight.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.css"]
})
export class FlightComponent implements OnInit {
  flights: any[] = [];
  flight = {
    airline: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    price: 0
  };
  isEditMode = false;
  editFlightId: number | null = null;
  showForm = false; // Control the visibility of the form

  constructor(private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFlights();
  }

  // Toggle form visibility
  toggleAddFlight(): void {
    this.showForm = !this.showForm;
  }

  // Cancel form submission and reset form
  cancelForm(): void {
    this.resetForm();
    this.showForm = false;
  }

  // Fetch all flights
  getFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      this.flights = data;
    });
  }

  // Add or update flight
  onSubmit(): void {
    if (this.isEditMode && this.editFlightId !== null) {
      // Update flight
      this.flightService.updateFlight(this.editFlightId, this.flight).subscribe(() => {
        this.resetForm();
        this.getFlights();
      });
    } else {
      // Add flight
      this.flightService.addFlight(this.flight).subscribe(() => {
        this.resetForm();
        this.getFlights();
      });
    }
  }

  // Set form for editing a flight
  editFlight(flight: any): void {
    this.flight = { ...flight };
    this.isEditMode = true;
    this.editFlightId = flight.flightId;
    this.showForm = true;
  }

  // Delete a flight
  deleteFlight(id: number): void {
    this.flightService.deleteFlight(id).subscribe(() => {
      this.getFlights();
    });
  }

  // Reset form after submission
  resetForm(): void {
    this.flight = {
      airline: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      availableSeats: 0,
      price: 0
    };
    this.isEditMode = false;
    this.editFlightId = null;
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
