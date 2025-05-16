import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightComponent } from './flight/flight.component';
import { CurrencyPipe } from '@angular/common';
import { BookFlightComponent } from './bookflight/bookflight.component';
import { UserBookingsComponent } from './userbookings/userbookings.component';
import { UserallbookingsComponent } from './userallbookings/userallbookings.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent,
    FlightComponent,
    BookFlightComponent,
    UserBookingsComponent,
    UserallbookingsComponent,
    UnauthorizedComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // Move FormsModule here
    ReactiveFormsModule,
    HttpClientModule // Already correctly placed here
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
