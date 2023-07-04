import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  username = '';
  password = '';
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Username and password cannot be blank';
      return;
    }

    this.authService.login(this.username, this.password)
    .subscribe({
      next: (response) => {
        console.log('User logged in!', response);
        // set user ID
        this.authService.setUserId(response.userId);
        // navigate to home page
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error', error);
        if(error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Login error';
        }
      }
    });
  }
}
