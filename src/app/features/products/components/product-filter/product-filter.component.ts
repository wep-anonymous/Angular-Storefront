import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-filter',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="filter-container">
      <div class="search-box">
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()"
          placeholder="Search products..."
          class="search-input">
      </div>
      
      <div class="category-filter">
        <select 
          [(ngModel)]="selectedCategory"
          (ngModelChange)="onCategoryChange()"
          class="category-select">
          <option value="all">All Categories</option>
          @for (category of categories; track category) {
            <option [value]="category">{{ category }}</option>
          }
        </select>
      </div>
    </div>
  `,
    styles: [`
    .filter-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 200px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-input:focus {
      outline: none;
      border-color: #333;
    }

    .category-select {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      background-color: white;
      cursor: pointer;
    }

    .category-select:focus {
      outline: none;
      border-color: #333;
    }
  `]
})
export class ProductFilterComponent {
    @Input() categories: string[] = [];
    @Output() filterChange = new EventEmitter<string>();
    @Output() searchChange = new EventEmitter<string>();

    selectedCategory = 'all';
    searchTerm = '';

    onCategoryChange(): void {
        this.filterChange.emit(this.selectedCategory);
    }

    onSearchChange(): void {
        this.searchChange.emit(this.searchTerm);
    }
}