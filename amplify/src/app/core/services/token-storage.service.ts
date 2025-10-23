import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ROLE = 'role';
  private readonly USER_INFO = 'user';
  public setToken(token: string, user_role: string, user_info: any): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, user_role);
    localStorage.setItem(this.USER_INFO, JSON.stringify(user_info));
  }
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  public clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE);
    localStorage.removeItem(this.USER_INFO);
  }
  public getRole() {
    return localStorage.getItem(this.USER_ROLE);
  }
  public getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user')!);
    return userInfo;
  }
}
