import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HistoryComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
