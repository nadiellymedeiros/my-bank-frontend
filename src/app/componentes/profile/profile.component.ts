import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../servicos/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id?: string;

  constructor(private rota: Router, private userService: UserService) {}

  public showEdit: boolean = false;

  formularioProfile = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.name = userData.name;
      this.amount = userData.amount;
      this.email = userData.email;
      this.password = userData.password;
      this.institution = userData.institution;
      this.agency = userData.agency;
      this.currentAccount = userData.currentAccount;
      this.bank = userData.bank;
      this.amount = userData.amount;
      this.id = userData.id;
    }
  }

  showEditUserProfile(): void {
    this.showEdit = true;
  }

  editUserProfile(): void {
    const newName = this.formularioProfile.get('name')?.value;
    const newEmail = this.formularioProfile.get('email')?.value;
    const newSenha = this.formularioProfile.get('password')?.value;

    if (newName) {
      const userDataString = localStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.name = newName;

        this.userService
          .atualizarUsuario(userData.id.toString(), { name: newName })
          .subscribe((updatedUser) => {
            localStorage.setItem('userData', JSON.stringify(updatedUser));
          });
      }
    } else if (newEmail) {
      const userDataString = localStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.email = newEmail;

        this.userService
          .atualizarUsuario(userData.id.toString(), { email: newEmail })
          .subscribe((updatedUser) => {
            localStorage.setItem('userData', JSON.stringify(updatedUser));
          });
      }
    } else if (newSenha) {
      const userDataString = localStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.password = newSenha;

        this.userService
          .atualizarUsuario(userData.id.toString(), { password: newSenha })
          .subscribe((updatedUser) => {
            localStorage.setItem('userData', JSON.stringify(updatedUser));
          });
      }
    } else {
      alert('Nenhuma alteração foi feita, tente novamente');
    }
    this.formularioProfile.reset();
  }

  hideEditUserProfile(): void {
    this.showEdit = false;
  }
}
