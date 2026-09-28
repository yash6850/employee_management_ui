import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http=inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  get<T>(endpoint: string, params?: any, token?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params,
      headers: this.authHeaders(token),
    });
  }

  post<T>(endpoint: string, body: any, token?: string): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.authHeaders(token),
    });
  }

  postText(endpoint: string, body: any, token?: string): Observable<string> {
    return this.http.post(`${this.baseUrl}${endpoint}`, body, {
      responseType: 'text',
      headers: this.authHeaders(token),
    });
  }

  put<T>(endpoint: string, body: any, token?: string): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.authHeaders(token),
    });
  }

  delete<T>(endpoint: string, token?: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.authHeaders(token),
    });
  }

  private authHeaders(token?: string): HttpHeaders {
    const normalizedToken = token?.replace(/^Bearer\s+/i, '');

    return normalizedToken
      ? new HttpHeaders({ Authorization: `${normalizedToken}` })
      : new HttpHeaders();
  }
}
