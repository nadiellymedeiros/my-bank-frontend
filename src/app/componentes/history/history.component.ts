import { Component, EventEmitter, Output } from '@angular/core';
import { HistoryService } from '../../servicos/history.service';
import { History } from '../../modelos/history';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FilterPipe } from '../../pipe/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, SearchComponent, FormsModule, FilterPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  idLoggedInUser?: string;
  searchText: any;
  historys: History[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.idLoggedInUser = userData.id;
    }

    this.getAllHistory();
  }

  getAllHistory(): void {
    this.historyService.getAllHistory().subscribe((historys) => {
      this.historys = historys;
    });
  }
}
