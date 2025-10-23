import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  gender: string;
  role: string;
  profile: string;
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private tokenStore: TokenStorageService,
    private router: Router
  ) {}

  public NextStepTrack: number = 1;

  animateStep = true;
  private role: string = '';
  public roles = [
    {
      name: 'Artist',
      img: '../../../../assets/images/billie-eilish-tout.jpg',
    },
    {
      name: 'User',
      img: '../../../../assets/images/listening.jpg',
    },
  ];

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
  });
  profile: File | null = null;

  onProfileSelected(event: any) {
    this.profile = event.target.files[0];
  }
  public setRole(selectedRole: string): void {
    this.role = selectedRole;
    if (this.NextStepTrack >= 1 && this.NextStepTrack < 2) {
      this.NextStepTrack = this.NextStepTrack + 1;
    } else {
      this.NextStepTrack = 1;
    }
  }
  public onRegister() {
    if (!this.registerForm.valid) {
      throw new Error('Email, password, name and role are required');
      return;
    } else {
      const { email, password, name, gender } = this.registerForm.controls;

      const formData = new FormData();
      formData.append('email', email.value!);
      formData.append('password', password.value!);
      formData.append('name', name.value!);
      formData.append('gender', gender.value!);
      formData.append('role', this.role);
      formData.append('profile', this.profile!);
      this.authService.register(formData).subscribe({
        next: (res) => {
          this.tokenStore.setToken(res.accessToken, res.user.role, res.user);

          if (res.user.role === 'Artist') {
            this.router.navigate(['/artist/dashboard']);
          } else if (res.user.role === 'User') {
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (err) => {},
      });
    }
  }

  public prevStep() {
    if (this.NextStepTrack > 1) {
      this.NextStepTrack--;
    } else {
      this.router.navigate(['/']);
    }
  }
}
