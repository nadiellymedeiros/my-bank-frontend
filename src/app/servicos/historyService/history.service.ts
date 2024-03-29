import { Injectable } from '@angular/core';
import { History } from '../../modelos/history';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../../modelos/user';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  private urlHistoryData: string = 'http://localhost:5292/transacoes';

  historyUser(id: number): Observable<any> {
    return this.http.get<User>(`${this.urlHistoryData}/${id}`);
  }
}

// private urlHistoryData: string =
//   'https://my-bank-backend-jsonserver.vercel.app/history';

// private monthSelectedSource = new Subject<{ month: number; year: number }>();
// monthSelected$ = this.monthSelectedSource.asObservable();

// constructor(private http: HttpClient) {}

// addHistory(obj: History): Observable<History> {
//   return this.http.post<History>(this.urlHistoryData, obj);
// }

// getAllHistory(): Observable<History[]> {
//   return this.http.get<History[]>(this.urlHistoryData);
// }

// // Método para selecionar o mês
// selectMonth(month: number, year: number): void {
//   this.monthSelectedSource.next({ month, year });
// }

// // Métodos para obter e definir o usuário logado
// private idRecipientUserUser?: number;
// private nameRecipientUser?: string;

// setLoggedInUserId(userId: number): void {
//   this.idRecipientUserUser = userId;
// }

// setLoggedInUser(user: User): void {
//   this.nameRecipientUser = user.Name;
// }

// getLoggedInUserId(): number | undefined {
//   return this.idRecipientUserUser;
// }

// getLoggedInUser(): string | undefined {
//   return this.nameRecipientUser;
// }
