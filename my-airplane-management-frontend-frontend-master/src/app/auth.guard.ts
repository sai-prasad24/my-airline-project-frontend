// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('UserToken');
//     if (token) {
//       return true; // User is logged in
//     } else {
//       // Navigate to the custom unauthorized component
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole'); // Expected values: 'Admin' or 'User'
 
    if (!token) {
      // User is not authenticated
      return this.router.createUrlTree(['/unauthorized']);
    }
 
    const requiredRole = route.data['role'] as string;
 
    if (requiredRole) {
      if (userRole === requiredRole) {
        // User has the required role
        return true;
      } else {
        // User does not have the required role
        // Pass the required role as a query parameter to the unauthorized route
        return this.router.createUrlTree(['/unauthorized'], { queryParams: { role: requiredRole } });
      }
    }
 
    // If no specific role is required, allow access
    return true;
  }
}
 
