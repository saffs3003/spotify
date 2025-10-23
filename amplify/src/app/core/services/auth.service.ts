import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../../features/auth/register/register.component';

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    gender: string;
    role: string;
    id: number;
    profile: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiurl = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private tokenStore: TokenStorageService,
    private router: Router
  ) {}

  //login using credentials
  public login(credential: Credentials) {
    return this.http.post(`${this.apiurl}/login`, credential);
  }

  //register
  public register(user: FormData) {
    return this.http.post<any>(`${this.apiurl}/register`, user);
  }

  public getRole() {
    return this.tokenStore.getRole();
  }

  //to get the role of the user
  public getUserByEmail(email: string) {
    return this.http.get<RegisterUser[]>(`${this.apiurl}/users?email=${email}`);
  }
  //logout
  public logOut() {
    // debugger;
    this.tokenStore.clearToken();
    this.router.navigate(['/login']);
  }
  public isLoggedIn(): boolean {
    return !!this.tokenStore.getToken();
  }
}
