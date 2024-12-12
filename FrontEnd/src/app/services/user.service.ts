import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/api'; // URL base do backend

  constructor(private http: HttpClient) {}

  /**
   * Busca detalhes do usuário autenticado.
   */
  getUserDetails(email: string): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Token não encontrado.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user-details?email=${email}`, { headers });
  }


  /**
   * Busca agendamentos do usuário autenticado.
   */
  getAppointments(): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Token não encontrado.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/appointments`, { headers });
  }
}
