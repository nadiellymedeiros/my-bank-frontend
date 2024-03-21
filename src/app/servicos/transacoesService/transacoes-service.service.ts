import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../modelos/user';

@Injectable({
  providedIn: 'root',
})
export class TransacoesServiceService {
  constructor(private http: HttpClient) {}

  private urlTransacoes: string = 'http://localhost:5292/transacoes';

  atualizarTransacoes(transacao: any): Observable<any> {
    console.log(transacao);
    return this.http.post<any>(this.urlTransacoes, transacao);
  }
}
