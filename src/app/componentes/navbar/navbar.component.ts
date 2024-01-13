import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id?: string;

  constructor(private rota: Router) {}

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

  sair(): void {
    localStorage.clear();
    this.rota.navigateByUrl('/login');
  }

  voltar(): void {
    this.rota.navigateByUrl('/home');
  }
}
