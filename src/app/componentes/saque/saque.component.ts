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

  ngOnInit() {}

  saque(): any {
    // Limpar o formulário
    this.formularioSaque.reset();
  }

  currentAmount(): void {}

  sair(): void {
    this.rota.navigateByUrl('/home');
  }
}
