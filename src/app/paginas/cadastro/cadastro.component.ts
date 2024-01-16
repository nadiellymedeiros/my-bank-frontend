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

  //vetor de users
  users: User[] = [];

  // Formulario:
  formularioCadastro = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    institution: new FormControl('', Validators.required),
    agency: new FormControl('', Validators.required),
    currentAccount: new FormControl('', Validators.required),
    bank: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  // Após renderizar o componente
  ngOnInit() {
    this.userService.listarUsers().subscribe((dados) => (this.users = dados));
  }

  criarConta(): void {
    const email = this.formularioCadastro.get('email')?.value;
    const password = this.formularioCadastro.get('password')?.value;
    const name = this.formularioCadastro.get('name')?.value;
    const amount = this.formularioCadastro.get('amount')?.value;

    const userCadastrado = this.formularioCadastro.value as User;

    if (email && password && name) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('name', name);

      this.userService
        .criarConta(this.formularioCadastro.value as User)
        .subscribe((user) => {
          this.users.push(user);
          this.formularioCadastro.reset();
        });

      this.rota.navigateByUrl('/home');
      console.log('typeof:' + typeof amount);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }

    localStorage.setItem('userData', JSON.stringify(userCadastrado));
  }
}
