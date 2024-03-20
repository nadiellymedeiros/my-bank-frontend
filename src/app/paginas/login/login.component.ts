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
import { LoginService } from '../../servicos/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  users: any;
  user: User | undefined;

  constructor(
    private rota: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
    // this.users = this.userService.listarUsers;
  }

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  autenticar(): void {
    const email = this.formulario.get('email')?.value;
    const senha = this.formulario.get('senha')?.value;

    if (email && senha) {
      var userLogado = this.loginService
        .loginSession(email, senha)
        .subscribe(() => {});
      if (userLogado) {
        this.rota.navigateByUrl('/home');
        // this.rota.navigate(['home'], { state: userLogado });
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  botaoFazerCadastro(): void {
    this.rota.navigateByUrl('/cadastro');
  }
}
