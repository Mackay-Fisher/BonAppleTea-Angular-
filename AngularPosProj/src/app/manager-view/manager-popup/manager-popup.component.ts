import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Represents the structure of a table column.
 */
interface TableColumn {
  /**
   * The key of the column.
   */
  key: string;
  /**
   * The header of the column.
   */
  header: string;
}

/**
 * Represents the configuration object for table columns in the manager's popup.
 */
interface TableConfig {
  /**
   * The columns of the table.
   */
  columns: TableColumn[];
}

/**
 * `ManagerPopupComponent` is a reusable UI component designed for displaying and managing tabular data in a popup modal.
 * It provides functionalities like edit, delete, and quick add operations for each row in the table.
 *
 * @Component Decorator that marks the class as an Angular component and provides metadata about the component.
 */
@Component({
  selector: 'app-manager-popup',
  templateUrl: './manager-popup.component.html',
  styleUrls: ['./manager-popup.component.scss']
})
export class ManagerPopupComponent {
  /**
   * The title of the popup, typically describing the table content or action.
   */
  @Input() title: string = '';

  /**
   * The configuration for the table, including the columns to display.
   */
  @Input() tableConfig?: TableConfig;

  /**
   * The content to be displayed within the table.
   */
  @Input() content: any[] = [];

  /**
   * Event emitter to notify the parent component to close the popup.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Event emitters for table row actions.
   */
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() quick = new EventEmitter<any>();

  searchText: string = '';
  filteredContent: any[];

  constructor() {
    this.filteredContent = [...this.content];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content'] && Array.isArray(changes['content'].currentValue)) {
      this.filteredContent = [...changes['content'].currentValue];
      this.filterContent();
    }
  }

  filterContent(): void {
    if (!this.searchText) {
      this.filteredContent = [...this.content];
    } else {
      if (this.title === 'Edit Menu') {
        this.filteredContent = this.content.filter(item => 
          item.menu_item_name.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.menu_item_type.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.menu_item_price.toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else if (this.title === 'Edit Inventory') {
        this.filteredContent = this.content.filter(item => 
          item.item_name.toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else if (this.title === 'Edit Ingredients') {
        this.filteredContent = this.content.filter(item => 
          item.ingredient_name.toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    }
  }
  /**
   * Handles the edit action for a row in the table.
   *
   * @param row The data row to be edited.
   */
  editRow(row: any): void {
    console.log('Editing row:', row);
    this.edit.emit(row);
  }

  /**
   * Handles the delete action for a row in the table.
   *
   * @param row The data row to be deleted.
   */
  deleteRow(row: any): void {
    console.log('Deleting row:', row);
    this.delete.emit(row);
  }

  /**
   * Emits an event for a quick add action.
   */
  quickAdd(): void {
    this.quick.emit();
  }

  /**
   * Emits an event to close the popup.
   */
  closePopup(): void {
    this.close.emit();
  }
}
