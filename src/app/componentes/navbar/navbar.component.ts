import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { LoginService } from '../../servicos/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  Id?: string;
  Email?: string;
  Name?: string;
  Password?: string;
  Cpf?: string;
  Telefone?: string;
  Saldo?: number;
  IsLogado?: boolean;
  IsActive?: boolean;
  CriadoEm?: Date;
  AtualizadoEm?: Date;
  DeletadoEm?: Date;
  NumeroConta?: string;
  Agencia?: number;

  userAutenticado: any;

  user: any;

  constructor(
    private rota: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);

      if (this.userAutenticado) {
        this.Name = this.userAutenticado.name;
        this.Saldo = this.userAutenticado.saldo;
        this.Id = this.userAutenticado.id;
      }
    });
  }

  ngOnInit() {
    this.Name = this.user.name;
    this.Saldo = this.user.saldo;
    this.Email = this.user.email;
    this.Password = this.user.password;
    this.Id = this.user.id;
  }

  sair(): void {
    if (this.Id) {
      this.loginService.logout(parseInt(this.Id)).subscribe(() => {
        this.rota.navigateByUrl('/login');
      });
    } else {
      console.error('ID do usuário não definido ao tentar fazer logout.');
    }
  }

  voltar(): void {
    this.rota.navigateByUrl('/home');
  }
}
