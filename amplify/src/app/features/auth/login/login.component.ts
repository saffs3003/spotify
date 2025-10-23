import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private tokenStore: TokenStorageService,
    public router: Router
  ) {}
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  public serverError: string | null = '';

  public onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.controls;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const loginCredentials: Credentials = {
        email: email.value!,
        password: password.value!,
      };

      // console.log(loginCredentials);
      this.authService.login(loginCredentials).subscribe({
        next: (res: any) => {
          // debugger;

          this.tokenStore.setToken(res.accessToken, res.user.role, res.user);

          const role = res.user.role;
          if (role === 'Admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'User') {
            this.router.navigate(['/user/dashboard']);
          } else if (role === 'Artist') {
            this.router.navigate(['/artist/dashboard']);
          } else {
            this.router.navigate(['']);
          }
        },
        error: (err) => {
          this.serverError = 'Invalid Credentials';
        },
      });
    }
  }
  public prevStep() {
    this.router.navigate(['/']);
  }
}
