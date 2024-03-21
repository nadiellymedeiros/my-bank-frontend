import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { History } from '../../modelos/history';
import { TransacoesServiceService } from '../../servicos/transacoesService/transacoes-service.service';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './deposito.component.html',
  styleUrl: './deposito.component.css',
})
export class DepositoComponent {
  userAutenticado: any;
  user: any;

  constructor(
    private rota: Router,
    private userService: UserService,
    private transacoesService: TransacoesServiceService
  ) {
    this.user = this.rota.getCurrentNavigation()?.extras.state;
  }

  formularioDeposito = new FormGroup({
    valor: new FormControl(''),
  });

  ngOnInit() {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);
    });
  }

  deposito(): void {
    const valorString = this.formularioDeposito.get('valor')?.value;
    if (valorString === null || valorString === undefined) {
      console.error('O valor é nulo ou indefinido');
      return;
    }
    const valor = parseFloat(valorString);

    const transacao = {
      Valor: valor,
      DirecaoTransacao: 'ENTRADA',
      TipoTransacao: 'DEPOSITO',
      UserId: this.userAutenticado.id,
      NumeroContaDestino: this.userAutenticado.numeroConta,
      NumeroContaOrigem: this.userAutenticado.numeroConta,
      Historico: '',
    };

    this.transacoesService.atualizarTransacoes(transacao).subscribe(() => {
      // Atualizações necessárias após a transferência ser concluída
      this.formularioDeposito.reset();
    });
  }

  sair(): void {
    this.rota.navigateByUrl('/home');
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
