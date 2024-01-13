import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HistoryService } from '../../servicos/history.service';
import { History } from '../../modelos/history';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './deposito.component.html',
  styleUrl: './deposito.component.css',
})
export class DepositoComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id?: string;

  constructor(
    private rota: Router,
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  formularioDeposito = new FormGroup({
    valorDeposito: new FormControl(''),
  });

  historys: History[] = [];

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
  }

  deposito(): any {
    const valorDepositoString: string | null | undefined =
      this.formularioDeposito.get('valorDeposito')?.value;
    const amount: number = Number(this.amount);

    if (valorDepositoString !== null && valorDepositoString !== undefined) {
      const valorDeposito: number = parseFloat(valorDepositoString);

      if (!isNaN(valorDeposito) && !isNaN(amount)) {
        let currentAmount: number = amount + valorDeposito;
        if (currentAmount > 0) {
          this.amount = currentAmount;

          this.currentAmount();
        } else {
          return;
        }
      } else {
        alert('Valor de depósito ou quantidade atual não é um número válido.');
      }
    } else {
      alert(
        "Controle 'valorDeposito' não encontrado ou é null/undefined no formulário."
      );
    }

    this.formularioDeposito.reset();
  }

  currentAmount(): void {
    const userDataString = localStorage.getItem('userData');
    const dataTransferencia = new Date().toLocaleDateString();
    const valorDepositoString: string | null | undefined =
      this.formularioDeposito.get('valorDeposito')?.value;

    if (valorDepositoString !== null && valorDepositoString !== undefined) {
      const valorDeposito: number = parseFloat(valorDepositoString);

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.amount = this.amount;

        this.userService
          .atualizarUsuario(userData.id.toString(), { amount: this.amount })
          .subscribe((updatedUser) => {
            localStorage.setItem('userData', JSON.stringify(updatedUser));
          });
        this.historyService
          .addHistory({
            idDonorUser: userData.id,
            nameDonorUser: userData.name,
            idRecipientUserUser: userData.id,
            nameRecipientUser: userData.name,
            type: 'deposit',
            amount: valorDeposito,
            date: dataTransferencia,
          })
          .subscribe((history) => {
            this.historys.push(history);
          });
      }
    }
  }

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
