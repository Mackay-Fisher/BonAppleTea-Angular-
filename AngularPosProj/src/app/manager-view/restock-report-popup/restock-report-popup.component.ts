import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Represents the structure of a table column in the restock report.
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
 * Represents the configuration object for table columns in the restock report popup.
 */
interface TableConfig {
  /**
   * The columns of the table.
   */
  columns: TableColumn[];
}

/**
 * `RestockReportPopupComponent` is designed to provide a popup modal for displaying restock reports.
 * It presents tabular data such as inventory levels and restock requirements, allowing for a quick overview of stock status.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-restock-report-popup',
  templateUrl: './restock-report-popup.component.html',
  styleUrls: ['./restock-report-popup.component.scss']
})
export class RestockReportPopupComponent {
  /**
   * The title of the popup, typically describing the content or purpose of the table.
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
   * Emits an event to close the restock report popup.
   */
  closeRestockPopup(): void {
    this.close.emit();
  }
}

