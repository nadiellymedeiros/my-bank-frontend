import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../servicos/user.service';
import { HistoryService } from '../../servicos/history.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../../modelos/user';
import { History } from '../../modelos/history';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
})
export class TransferenciaComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id: number | undefined;

  constructor(
    private rota: Router,
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  formularioTransferencia = new FormGroup({
    valorTransferencia: new FormControl(''),
    instituicao: new FormControl(''),
    agencia: new FormControl(''),
    contaCorrente: new FormControl(''),
  });

  historys: History[] = [];

  ngOnInit() {
    this.historyService
      .getAllHistory()
      .subscribe((historysData) => (this.historys = historysData));

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

  transferencia(): any {
    const valorTransferenciaString: string | null | undefined =
      this.formularioTransferencia.get('valorTransferencia')?.value;
    const amount: number = Number(this.amount);

    if (
      valorTransferenciaString !== null &&
      valorTransferenciaString !== undefined
    ) {
      const valorTransferencia: number = parseFloat(valorTransferenciaString);

      if (!isNaN(valorTransferencia) && !isNaN(amount)) {
        if (valorTransferencia <= amount) {
          let currentAmount: number = amount - valorTransferencia;

          this.amount = currentAmount;

          this.currentAmount();
          this.recebidoTransferencia();
          this.addHistoryTransfer();
          // Atualizar o serviço com o novo valor do saldo
          // this.userService.updateAmount(this.amount);
        } else {
          alert(
            'Valor indisponível. O valor de transferência é maior do que o saldo disponível.'
          );
        }
      } else {
        alert(
          'Valor de transferência ou quantidade atual não é um número válido.'
        );
      }
    } else {
      alert(
        "Controle 'valorTransferencia' não encontrado ou é null/undefined no formulário."
      );
    }

    this.formularioTransferencia.reset();
  }

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

  recebidoTransferencia(): void {
    const valorTransferenciaRecebido =
      this.formularioTransferencia.get('valorTransferencia')?.value;
    const instituicaoRecebido =
      this.formularioTransferencia.get('instituicao')?.value;
    const agenciaRecebido = this.formularioTransferencia.get('agencia')?.value;
    const contaCorrenteRecebido =
      this.formularioTransferencia.get('contaCorrente')?.value;

    if (
      valorTransferenciaRecebido !== undefined &&
      valorTransferenciaRecebido !== null &&
      instituicaoRecebido !== undefined &&
      instituicaoRecebido !== null &&
      agenciaRecebido !== undefined &&
      agenciaRecebido !== null &&
      contaCorrenteRecebido !== undefined &&
      contaCorrenteRecebido !== null
    ) {
      const valorTransferenciaNumerico = parseFloat(valorTransferenciaRecebido);

      if (!isNaN(valorTransferenciaNumerico)) {
        this.userService.listarUsers().subscribe((users) => {
          const usuarioBeneficiado = users.find(
            (user) =>
              user.agency === agenciaRecebido &&
              user.currentAccount === contaCorrenteRecebido &&
              user.institution === instituicaoRecebido
          );

          if (usuarioBeneficiado && usuarioBeneficiado.id !== undefined) {
            if (usuarioBeneficiado.amount !== undefined) {
              usuarioBeneficiado.amount += valorTransferenciaNumerico;

              this.userService
                .atualizarUsuario(usuarioBeneficiado.id.toString(), {
                  amount: usuarioBeneficiado.amount,
                })
                .subscribe((updatedUser) => {
                  if (updatedUser && updatedUser.id !== undefined) {
                    localStorage.setItem(
                      'usuarioBeneficiado',
                      JSON.stringify(updatedUser)
                    );
                  } else {
                    console.error(
                      'ID do usuário beneficiado não está definido após atualização.'
                    );
                  }
                });
            } else {
              console.error('Amount do usuário beneficiado não está definido.');
            }
          } else {
            console.error('ID do usuário beneficiado não está definido.');
          }

          return usuarioBeneficiado || null;
        });
      } else {
        console.error('Valor de transferência não é um número válido.');
      }
    } else {
      console.error('Valores da transferência não são válidos.');
    }

    // Limpa o formulário após o processamento
    // this.formularioTransferencia.reset();
  }

  addHistoryTransfer(): void {
    const valorTransferenciaRecebido =
      this.formularioTransferencia.get('valorTransferencia')?.value;
    const instituicaoRecebido =
      this.formularioTransferencia.get('instituicao')?.value;
    const agenciaRecebido = this.formularioTransferencia.get('agencia')?.value;
    const contaCorrenteRecebido =
      this.formularioTransferencia.get('contaCorrente')?.value;

    let recipientUser: History;

    if (
      typeof valorTransferenciaRecebido === 'number' &&
      typeof instituicaoRecebido === 'string' &&
      typeof agenciaRecebido === 'string' &&
      typeof contaCorrenteRecebido === 'string' &&
      this.id !== undefined
    ) {
      const valorTransferenciaNumerico = parseFloat(valorTransferenciaRecebido);
      const dataTransferencia = new Date().toLocaleDateString();

      this.userService.listarUsers().subscribe((users) => {
        let recipientUser = users.find(
          (user) =>
            user.currentAccount === contaCorrenteRecebido &&
            user.agency === agenciaRecebido
        );
        if (recipientUser) {
          this.userService.setRecipientUser(recipientUser);

          this.historyService
            .addHistory({
              idDonorUser: this.id,
              nameDonorUser: this.name,
              idRecipientUserUser: recipientUser.id,
              nameRecipientUser: recipientUser.name,
              type: 'transfer',
              amount: valorTransferenciaNumerico,
              date: dataTransferencia,
            })
            .subscribe((history) => {
              this.historys.push(history);
            });
        } else {
          console.error('Usuário destinatário não encontrado.');
        }
      });
    }
  }

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
