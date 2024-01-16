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

  // private urlUser: string = 'http://localhost:5000/userData';

  private urlUser: string =
    'https://my-bank-backend-jsonserver.vercel.app/userData';

  private loggedInUserId?: number;
  private loggedInUser?: User;
  private recipientUser?: User;
  private amountSubject = new BehaviorSubject<number | undefined>(undefined);

  // Método para retornar todas os usuários
  listarUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser);
  }

  //Método para cadastrar usuários
  criarConta(obj: User): Observable<User> {
    return this.http.post<User>(this.urlUser, obj);
  }

  // Método para atualizar o usuário
  atualizarUsuario(id: string, userData: any): Observable<User> {
    const url = `${this.urlUser}/${id}`;
    return this.http.patch<User>(url, userData);
  }

  // Atualize o ID do usuário logado
  setLoggedInUserId(userId: number): void {
    this.loggedInUserId = userId;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
  }

  setRecipientUser(recipientUser: User): void {
    this.recipientUser = recipientUser;
  }

  // Obtenha o ID do usuário logado
  getLoggedInUserId(): number | undefined {
    return this.loggedInUserId;
  }

  getLoggedInUser(): User | undefined {
    return this.loggedInUser;
  }

  // Métodos para lidar com o valor do saldo
  updateAmount(amountUpdate: Number, userId: Number): Observable<any> {
    return this.http.patch<any>(`${this.urlUser}/${userId}`, {
      amount: amountUpdate,
    });

    // const amount = user.amount ? parseFloat(user.amount.toString()) : undefined;
    // this.amountSubject.next(amount);
  }

  // atualizarUsuario(id: string, userData: any): Observable<User> {
  //   const url = `${this.urlUser}/${id}`;
  //   return this.http.patch<User>(url, userData);
  // }

  getAmount(): Observable<number | undefined> {
    return this.amountSubject.asObservable();
  }

  //verificar se esta sendo usada:
  // Método para verificar se o usuário existe no backend
  verificarUsuario(email: string, senha: string): Observable<boolean> {
    return this.listarUsers().pipe(
      map((users) => {
        return users.some(
          (user) => user.email === email && user.password === senha
        );
      })
    );
  }
}

// Observable: Executa requisições em períodos de tempo
// Subscriber: Recebe o retorno das requisições

// Método para retornar o endereço
// retornarEndereco(cep:string):Observable<Endereco>{
//   return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
// }
