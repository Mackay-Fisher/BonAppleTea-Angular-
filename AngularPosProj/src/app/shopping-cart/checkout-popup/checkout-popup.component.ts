import { Component, Input, Output, EventEmitter } from '@angular/core';

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
 * Represents the configuration object for table columns in the checkout popup.
 */
interface TableConfig {
  /**
   * The columns of the table.
   */
  columns: TableColumn[];
}

/**
 * `CheckoutPopupComponent` is designed to display a checkout interface.
 * It presents a summary of items, their details, and the total cost in a tabular format.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-checkout-popup',
  templateUrl: './checkout-popup.component.html',
  styleUrls: ['./checkout-popup.component.scss']
})
export class CheckoutPopupComponent {
  /**
   * The title of the popup, typically describing the content or purpose.
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
   * The total cost of items in the checkout.
   */
  @Input() total: string = "0";

  /**
   * Event emitter to notify the parent component to close the popup.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Emits an event to close the checkout popup.
   */
  closePopup(): void {
    this.close.emit();
  }
}
