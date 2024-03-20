import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../servicos/user.service';

@Component({
  selector: 'app-my-cards',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './my-cards.component.html',
  styleUrl: './my-cards.component.css',
})
export class MyCardsComponent {
  Name?: string;
  NumeroConta?: string;
  Agencia?: number;
  user: any;
  userAutenticado: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);

      console.log('meu cartão');

      if (this.userAutenticado) {
        this.Name = this.userAutenticado.name;
        this.NumeroConta = this.userAutenticado.numeroConta;
        this.Agencia = this.userAutenticado.agencia;
      }
    });
  }
}
