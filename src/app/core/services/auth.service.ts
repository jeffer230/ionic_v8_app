import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(Storage);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  constructor() {
    this.init();
  }

  private async init() {
    await this.storage.create();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  async saveToken(token: string): Promise<void> {
    await this.storage.set('token', token);
  }

  async getToken(): Promise<string | null> {
    return await this.storage.get('token');
  }

  async logout(): Promise<void> {
    await this.storage.remove('token');
    this.router.navigate(['/login']); // Redirige al login tras cerrar sesión
  }
}