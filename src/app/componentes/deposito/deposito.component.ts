import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HistoryService } from '../../servicos/history.service';
import { History } from '../../modelos/history';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './deposito.component.html',
  styleUrl: './deposito.component.css',
})
export class DepositoComponent {
  user: any;

  constructor(
    private rota: Router,
    private userService: UserService,
    private historyService: HistoryService
  ) {
    this.user = this.rota.getCurrentNavigation()?.extras.state;
  }

  formularioDeposito = new FormGroup({
    valorDeposito: new FormControl(''),
  });

  historys: History[] = [];

  ngOnInit() {
    // const userLogado = this.rota.getCurrentNavigation()?.extras.state?.['Id'];
    // if (userLogado) {
    //   this.userService.getUser(userLogado).subscribe((user) => {
    //     this.user = user;
    //   });
    // }
  }

  deposito(): void {
    const valorDepositoString =
      this.formularioDeposito.get('valorDeposito')?.value ?? '';
    const valorDeposito = parseFloat(valorDepositoString);

    if (!isNaN(valorDeposito) && this.user) {
      const novoSaldo = this.user.Saldo + valorDeposito;
      this.userService
        .atualizarUsuario(this.user.Id!.toString(), { saldo: novoSaldo })
        .subscribe(() => {
          this.user!.Saldo = novoSaldo;
          this.formularioDeposito.reset();
        });
    } else {
      alert('Por favor, insira um valor válido.');
    }
  }

  // deposito(): void {
  //   const valorDepositoString: string | null | undefined =
  //     this.formularioDeposito.get('valorDeposito')?.value;
  //   const amount: number = Number(this.Saldo);

  //   if (valorDepositoString !== null && valorDepositoString !== undefined) {
  //     const valorDeposito: number = parseFloat(valorDepositoString);

  //     if (!isNaN(valorDeposito) && !isNaN(amount)) {
  //       let currentAmount: number = amount + valorDeposito;
  //       if (currentAmount > 0) {
  //         this.Saldo = currentAmount;
  //         this.currentAmount();
  //       } else {
  //         return;
  //       }
  //     } else {
  //       alert('Valor de depósito ou quantidade atual não é um número válido.');
  //     }
  //   } else {
  //     alert(
  //       "Controle 'valorDeposito' não encontrado ou é null/undefined no formulário."
  //     );
  //   }

  //   this.formularioDeposito.reset();
  // }

  // currentAmount(): void {
  //   const userDataString = localStorage.getItem('userData');
  //   const dataTransferencia = new Date().toLocaleDateString();
  //   const valorDepositoString: string | null | undefined =
  //     this.formularioDeposito.get('valorDeposito')?.value;

  //   if (valorDepositoString !== null && valorDepositoString !== undefined) {
  //     const valorDeposito: number = parseFloat(valorDepositoString);

  //     if (userDataString) {
  //       const userData = JSON.parse(userDataString);
  //       userData.amount = this.Saldo;

  //       this.userService
  //         .atualizarUsuario(userData.id.toString(), { amount: this.Saldo })
  //         .subscribe((updatedUser) => {
  //           localStorage.setItem('userData', JSON.stringify(updatedUser));
  //         });
  //       this.historyService
  //         .addHistory({
  //           idDonorUser: userData.id,
  //           nameDonorUser: userData.name,
  //           idRecipientUserUser: userData.id,
  //           nameRecipientUser: userData.name,
  //           type: 'deposit',
  //           amount: valorDeposito,
  //           date: dataTransferencia,
  //         })
  //         .subscribe((history) => {
  //           this.historys.push(history);
  //         });
  //     }
  //   }
  // }

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
