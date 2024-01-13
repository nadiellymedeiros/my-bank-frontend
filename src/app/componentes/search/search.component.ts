import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FilterPipe } from '../../pipe/filter.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: any;
}
