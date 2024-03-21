import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HistoryService } from '../../servicos/historyService/history.service';
import { History } from '../../modelos/history';
import { TransacoesServiceService } from '../../servicos/transacoesService/transacoes-service.service';

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './saque.component.html',
  styleUrl: './saque.component.css',
})
export class SaqueComponent {
  userAutenticado: any;
  user: any;

  constructor(
    private rota: Router,
    private userService: UserService,
    private transacoesService: TransacoesServiceService
  ) {}

  formularioSaque = new FormGroup({
    valor: new FormControl(''),
  });

  ngOnInit() {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);
    });
  }

  saque(): void {
    const valorString = this.formularioSaque.get('valor')?.value;
    if (valorString === null || valorString === undefined) {
      console.error('O valor é nulo ou indefinido');
      return;
    }
    const valor = parseFloat(valorString);

    const transacao = {
      Valor: valor,
      DirecaoTransacao: 'SAIDA',
      TipoTransacao: 'SAQUE',
      UserId: this.userAutenticado.id,
      NumeroContaDestino: this.userAutenticado.numeroConta,
      NumeroContaOrigem: this.userAutenticado.numeroConta,
      Historico: '',
    };

    this.transacoesService.atualizarTransacoes(transacao).subscribe(() => {
      // Atualizações necessárias após a transferência ser concluída
      this.formularioSaque.reset();
    });
  }

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
