import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { DepositoComponent } from '../../componentes/deposito/deposito.component';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { LoginService } from '../../servicos/login/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DepositoComponent,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  Name?: string;
  Email?: string;
  Password?: string;
  Saldo?: number;
  Id?: string;
  user: any;
  userAutenticado: any;

  constructor(
    private rota: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
    // this.user = this.rota.getCurrentNavigation()?.extras.state;

    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);

      if (this.userAutenticado) {
        this.Name = this.userAutenticado.name;
        this.Saldo = this.userAutenticado.saldo;
        this.Id = this.userAutenticado.id;
      }
    });
  }

  ngOnInit() {
    // const userDataString = localStorage.getItem('userData');
    // if (userDataString) {
    //   const userData = JSON.parse(userDataString);
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);

      if (this.userAutenticado) {
        this.Name = this.userAutenticado.name;
        this.Saldo = this.userAutenticado.saldo;
        this.Id = this.userAutenticado.id;
      }
    });

    this.Name = this.user.name;
    this.Saldo = this.user.saldo;
    this.Email = this.user.email;
    this.Password = this.user.password;
    this.Id = this.user.id;
    // }
    // console.log('home console.log: ' + userDataString);
  }

  //função atualizar o amount do usuário
  currentAmount(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      userData.amount = this.Saldo;

      this.userService
        .atualizarUsuario(userData.id.toString(), { saldo: this.Saldo })
        .subscribe((updatedUser) => {
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        });
    }
  }

  loggedInUserId(): void {
    // let loggedInUserId = this.userService.setLoggedInUser;
    // console.log(loggedInUserId);
  }

  sair(): void {
    if (this.Id) {
      this.loginService.logout(parseInt(this.Id)).subscribe(() => {
        this.rota.navigateByUrl('/login');
      });
    } else {
      console.error('ID do usuário não definido ao tentar fazer logout.');
    }
  }

  rotaProfile(user: any): void {
    this.rota.navigate(['profile'], { state: user });
  }

  rotaDeposito(user: any): void {
    this.rota.navigate(['deposito'], { state: user });
  }

  rotaTransferencia(user: any): void {
    // this.rota.navigateByUrl('/transferencia');
    this.rota.navigate(['deposito'], { state: user });
  }

  rotaSaque(user: any): void {
    // this.rota.navigateByUrl('/saque');
    this.rota.navigate(['saque'], { state: user });
  }

  rotaMyCards(user: any): void {
    this.rota.navigate(['myCards'], { state: user });
  }

  rotaAccount(user: any): void {
    // this.rota.navigateByUrl('/account');
    this.rota.navigate(['account'], { state: user });
  }
}
