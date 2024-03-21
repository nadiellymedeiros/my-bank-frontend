import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../servicos/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TransacoesServiceService } from '../../servicos/transacoesService/transacoes-service.service';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
})
export class TransferenciaComponent {
  userAutenticado: any;

  constructor(
    private userService: UserService,
    private transacoesService: TransacoesServiceService
  ) {}

  formularioTransferencia = new FormGroup({
    valor: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);
    });
  }

  transferencia(): void {
    const valorString = this.formularioTransferencia.get('valor')?.value;
    if (valorString === null || valorString === undefined) {
      console.error('O valor é nulo ou indefinido');
      return;
    }

    const valor = parseFloat(valorString);
    const numeroContaDestino =
      this.formularioTransferencia.get('numeroContaDestino')?.value;

    const transacao = {
      Valor: valor,
      DirecaoTransacao: 'SAIDA',
      TipoTransacao: 'TRANSFERENCIA',
      UserId: this.userAutenticado.id,
      NumeroContaDestino: numeroContaDestino,
      NumeroContaOrigem: this.userAutenticado.numeroConta,
      Historico: '',
    };

    this.transacoesService.atualizarTransacoes(transacao).subscribe(() => {
      // Atualizações necessárias após a transferência ser concluída
      this.formularioTransferencia.reset();
    });
  }

  // currentAmount(): void {}

  // recebidoTransferencia(): void {}

  // addHistoryTransfer(): void {}

  // sair(): void {
  //   this.rota.navigateByUrl('/home');
  // }
}
