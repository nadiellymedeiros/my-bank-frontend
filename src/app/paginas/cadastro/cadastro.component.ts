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
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  constructor(private rota: Router, private userService: UserService) {}
  user: any;

  // Formulario:
  formularioCadastro = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
  });

  // Após renderizar o componente
  ngOnInit() {
    this.userService.listarUsers().subscribe((dados) => (this.user = dados));
  }

  criarConta(): void {
    const email = this.formularioCadastro.get('email')?.value;
    const password = this.formularioCadastro.get('password')?.value;
    const name = this.formularioCadastro.get('name')?.value;
    const cpf = this.formularioCadastro.get('cpf')?.value;
    const telefone = this.formularioCadastro.get('telefone')?.value;

    const userCadastrado = this.formularioCadastro.value as User;

    if (email && password && name) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('name', name);

      this.userService
        .criarConta({
          Email: email,
          name: name,
          password: password,
          Cpf: cpf,
          Telefone: telefone,
        })
        .subscribe((user) => {
          this.user.push(user);
          this.formularioCadastro.reset();
          console.log(user);
          this.rota.navigate(['home'], { state: user });
        });

      //this.rota.navigateByUrl('/home');
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }

    // localStorage.setItem('userData', JSON.stringify(userCadastrado));
  }

  rotaLogin() {
    this.rota.navigateByUrl('/login');
  }
}
