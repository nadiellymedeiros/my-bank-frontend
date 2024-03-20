import { Component } from '@angular/core';
import { HistoryService } from '../../servicos/historyService/history.service';
import { History } from '../../modelos/history';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterPipe } from '../../pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../servicos/user.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, SearchComponent, FormsModule, FilterPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  // idLoggedInUser?: string;
  Name?: string;
  Email?: string;
  Password?: string;
  Saldo?: number;
  Id?: string;

  searchText: any;
  userAutenticado: any;
  historys: History[] = [];

  constructor(
    private historyService: HistoryService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.listarUsers().subscribe((users) => {
      this.userAutenticado = users.find((user) => user.isLogado === true);

      if (this.userAutenticado) {
        this.Name = this.userAutenticado.name;
        this.Saldo = this.userAutenticado.saldo;
        this.Id = this.userAutenticado.id;

        if (this.Id) {
          const userId = parseInt(this.Id);
          this.historyService.historyUser(userId).subscribe((historyData) => {
            console.log(historyData);
            this.historys = historyData;
          });
        } else {
          console.error(
            'ID do usuário não definido ao tentar buscar histórico.'
          );
        }
      }
    });
  }

  // ngOnInit() {
  //   this.userService.listarUsers().subscribe((users) => {
  //     this.userAutenticado = users.find((user) => user.isLogado === true);

  //     if (this.userAutenticado) {
  //       this.Name = this.userAutenticado.name;
  //       this.Saldo = this.userAutenticado.saldo;
  //       this.Id = this.userAutenticado.id;
  //       this.historys = this.userAutenticado
  //     }

  //   });

  //   this.historyService.historyUser(this.Id).subscribe((history) => {
  //     this.historys = history;
  //   });

  // }
}

// getAllHistory(): void {
//   this.historyService.getAllHistory().subscribe((historys) => {
//     this.historys = historys;
//   });
// }
