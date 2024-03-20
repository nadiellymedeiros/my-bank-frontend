import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../modelos/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private urlLogin: string = 'http://localhost:5292/login';

  loginSession(email: string, password: string): Observable<User> {
    const body = { email, password };
    console.log(this.urlLogin, body);

    return this.http.post<User>(this.urlLogin, body);
  }

  logout(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5292/login/logout/${id}`);
  }

  // logout(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.urlLogout}/${id}`);
  // }
}
