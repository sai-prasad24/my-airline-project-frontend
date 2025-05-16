import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { BodyComponent } from './body/body.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FlightComponent } from './flight/flight.component';
import { BookFlightComponent } from './bookflight/bookflight.component';
import { UserBookingsComponent } from './userbookings/userbookings.component';
import { UserallbookingsComponent } from './userallbookings/userallbookings.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth.guard';




const routes: Routes =[
  {path:'',component:StartComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:BodyComponent,canActivate:[AuthGuard],data : {role:'user'}}, 
  {path:'login',component:LoginComponent},
  {path:'admin/flight',component:FlightComponent,canActivate:[AuthGuard],data : {role:'admin'}},
  {path: 'bookflight/:flightId', component: BookFlightComponent ,canActivate:[AuthGuard],data : {role:'user'}},
  {path: 'getbookingsforuser', component:UserBookingsComponent,canActivate:[AuthGuard],data : {role:'user'}},
  {path:'getbookingsforall', component:UserallbookingsComponent,canActivate:[AuthGuard],data : {role:'admin'}},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
