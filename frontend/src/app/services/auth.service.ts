import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, of, startWith } from 'rxjs';
import { AuthLogin } from '../types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  signCustomerIn(body: { email: string; password: string }): Observable<any> {
    return this.http
      .post<AuthLogin>(`${environment.baseUrl}/auth/login/customer`, {
        ...body,
      })
      .pipe(
        map((response) => ({ loading: false, data: response, error: null })),
        catchError((error) => {
          return of({
            loading: false,
            data: null,
            error: error.error.message[1],
          });
        }),
        startWith({ loading: true, post: null, error: null }),
        finalize(() => 'API call completed')
      );
  }
}
