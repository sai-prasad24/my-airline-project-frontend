import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    
    
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      console.log('Form values:', this.loginForm.value);

      this.authService.login(userName, password).subscribe({
        next: (response: string) => {
          console.log('Login successful, token:', response);
          try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(response);
            localStorage.setItem("userId", decodedToken.userId);
            localStorage.setItem("userName", decodedToken.userName);
            localStorage.setItem("userRole", decodedToken.role);
            localStorage.setItem("userEmail", decodedToken.userEmail);
   
            console.log(decodedToken);
            console.log(decodedToken.role);

             if(decodedToken.role=="admin")
             {
                this.router.navigate(['/admin/flight']);
             }
             else{
              this.router.navigate(['/home']);
             }
            
          } catch(error) {
            console.log(error);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Invalid username or password';
          alert('Invalid username or password')
        }
      });
    }
  }
}
