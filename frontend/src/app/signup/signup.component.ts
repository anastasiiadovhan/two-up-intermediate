import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username = '';
  password = '';
  confirmPassword = '';
  passwordsDoNotMatch = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }
    // Check if the passwords match
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;
    if (this.passwordsDoNotMatch) {
      return;
    }

    this.authService.signup(this.username, this.password)
    .subscribe({
      next: (response) => {
        console.log('User registered!', response);
        this.router.navigate(['/login']);
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Registration error', error);
        if(error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Registration error';
        }
      }
    });
  }
}
