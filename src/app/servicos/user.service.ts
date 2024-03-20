import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../modelos/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private urlUser: string = 'http://localhost:5292/users';

  private amountSubject = new BehaviorSubject<number | undefined>(undefined);

  listarUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.urlUser);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlUser}/${id}`);
  }

  criarConta(obj: any): Observable<User> {
    return this.http.post<any>(this.urlUser, obj);
  }

  atualizarUsuario(id: string, user: any): Observable<User> {
    const url = `${this.urlUser}/${id}`;
    return this.http.patch<User>(url, user);
  }
}
