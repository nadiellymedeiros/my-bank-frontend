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

  ngOnInit() {}

  transferencia(): any {}

  currentAmount(): void {}

  recebidoTransferencia(): void {}

  addHistoryTransfer(): void {}

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
