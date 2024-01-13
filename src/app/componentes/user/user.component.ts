import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../servicos/user.service';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // Construtor
  constructor(private servicoUser: UserService) {}

  // Vetor de usuários
  users: User[] = [];

  // Ao iniciar (O componente é criado)
  ngOnInit() {
    this.listarUsers();
  }

  listarUsers(): void {
    this.servicoUser.listarUsers().subscribe((retorno) => {
      // console.table(retorno);
      this.users = retorno;
    });
  }

  //Função para verificar se o usuário existe
  // userLogin(email: string, senha: string): void {
  //   this.servicoUser.verificarUsuario(email, senha).subscribe((existe) => {
  //     if (existe) {
  //       alert('Usuário autenticado com sucesso.');

  //       localStorage.setItem('email', email);

  //        this.rota.navigateByUrl('/home');
  //     } else {
  //       alert('E-mail ou senha incorretos.');
  //     }
  //   });
  // }
}
