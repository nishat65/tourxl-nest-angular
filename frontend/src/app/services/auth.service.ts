import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/posts`);
  }
}
