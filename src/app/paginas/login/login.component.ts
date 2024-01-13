import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private rota: Router, private userService: UserService) {}

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  autenticar(): void {
    const email = this.formulario.get('email')?.value;
    const senha = this.formulario.get('senha')?.value;

    if (email && senha) {
      this.userService.listarUsers().subscribe((users) => {
        const autenticado = users.find(
          (user) => user.email === email && user.password === senha
        );
        // const userAutenticado = users.find

        if (autenticado) {
          localStorage.setItem('email', email);
          localStorage.setItem('senha', senha);

          this.userService.setLoggedInUser(autenticado);
          localStorage.setItem('userData', JSON.stringify(autenticado));
          //      const userId = autenticado.id;
          //  this.userService.setLoggedInUserId(userId);

          this.rota.navigateByUrl('/home');
        } else {
          alert('E-mail ou senha incorretos.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }

    // this.userService.listarUsers().subscribe((users) => {
    //   const usuarioAutenticado = users.find(
    //     (user) => user.email === email && user.password === senha
    //   );
    //   if (usuarioAutenticado) {
    //     localStorage.setItem('userData', JSON.stringify(usuarioAutenticado));
    //   }

    //   return usuarioAutenticado || null;
    // });
  }

  botaoFazerCadastro(): void {
    this.rota.navigateByUrl('/cadastro');
  }
}

//Função para autenticar
// autenticar(): void {
//   if (
//     this.formulario.value.email === 'teste@teste.com' &&
//     this.formulario.value.senha === '123'
//   ) {
//      Adicionar o e-mail no localStorage
//     localStorage.setItem('email', this.formulario.value.email);

//      Redirecionamento
//     this.rota.navigateByUrl('/home');
//   } else {
//     alert('E-mail ou senha incorretos.');
//   }
// }
