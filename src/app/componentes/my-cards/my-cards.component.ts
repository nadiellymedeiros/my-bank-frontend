import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-my-cards',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './my-cards.component.html',
  styleUrl: './my-cards.component.css',
})
export class MyCardsComponent {
  name?: string;
  email?: string;
  password?: string;
  institution?: string;
  agency?: string;
  currentAccount?: string;
  bank?: string;
  amount?: number;
  id?: string;

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
}
