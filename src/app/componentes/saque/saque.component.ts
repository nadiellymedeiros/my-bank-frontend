import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HistoryService } from '../../servicos/history.service';
import { History } from '../../modelos/history';

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './saque.component.html',
  styleUrl: './saque.component.css',
})
export class SaqueComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id: number = 0;

  constructor(
    private rota: Router,
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  formularioSaque = new FormGroup({
    valorSaque: new FormControl(''),
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

  saque(): any {
    const valorSaqueString: string | null | undefined =
      this.formularioSaque.get('valorSaque')?.value;
    const amount: number = Number(this.amount);
    const userId = this.id;

    if (valorSaqueString !== null && valorSaqueString !== undefined) {
      const valorSaque: number = parseFloat(valorSaqueString);

      if (!isNaN(valorSaque) && !isNaN(amount)) {
        if (valorSaque <= amount) {
          let currentAmount: number = amount - valorSaque;
          this.amount = currentAmount;

          // this.currentAmount();

          // Atualizar o serviço com o novo valor do saldo
          this.userService
            .updateAmount(this.amount, userId)
            .subscribe({
              next: (res) => console.log(res),
              error: (err) => console.log(err),
            });
        } else {
          alert(
            'Saldo insuficiente. O valor de saque é maior do que o saldo disponível.'
          );
        }
      } else {
        console.error(
          'Valor de saque ou quantidade atual não é um número válido.'
        );
      }
    } else {
      console.error(
        "Controle 'valorSaque' não encontrado ou é null/undefined no formulário."
      );
    }

    // Limpar o formulário
    this.formularioSaque.reset();
  }

  currentAmount(): void {
    const userDataString = localStorage.getItem('userData');
    const dataTransferencia = new Date().toLocaleDateString();
    const valorSaqueString: string | null | undefined =
      this.formularioSaque.get('valorSaque')?.value;

    if (valorSaqueString !== null && valorSaqueString !== undefined) {
      const valorSaque: number = parseFloat(valorSaqueString);

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
            type: 'withdrawal',
            amount: valorSaque,
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
