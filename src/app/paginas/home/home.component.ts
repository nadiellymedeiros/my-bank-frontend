import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../modelos/user';
import { UserService } from '../../servicos/user.service';
import { DepositoComponent } from '../../componentes/deposito/deposito.component';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';

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
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id?: string;

  constructor(private rota: Router, private userService: UserService) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.name = userData.name;
      this.amount = userData.amount;
      this.email = userData.email;
      this.password = userData.password;
      this.institution = userData.institution;
      this.agency = userData.agency;
      this.currentAccount = userData.currentAccount;
      this.bank = userData.bank;
      this.amount = userData.amount;
      this.id = userData.id;
    }
    console.log('home console.log: ' + userDataString);
  }

  //função atualizar o amount do usuário
  currentAmount(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      userData.amount = this.amount;

      this.userService
        .atualizarUsuario(userData.id.toString(), { amount: this.amount })
        .subscribe((updatedUser) => {
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        });
    }
  }

  loggedInUserId(): void {
    let loggedInUserId = this.userService.setLoggedInUser;
    console.log(loggedInUserId);
  }

  sair(): void {
    localStorage.clear();
    this.rota.navigateByUrl('/login');
  }

  rotaProfile(): void {
    this.rota.navigateByUrl('/profile');
  }

  rotaDeposito(): void {
    this.rota.navigateByUrl('/deposito');
  }

  rotaTransferencia(): void {
    this.rota.navigateByUrl('/transferencia');
  }

  rotaSaque(): void {
    this.rota.navigateByUrl('/saque');
  }

  rotaMyCards(): void {
    this.rota.navigateByUrl('/myCards');
  }

  rotaAccount(): void {
    this.rota.navigateByUrl('/account');
  }
}
