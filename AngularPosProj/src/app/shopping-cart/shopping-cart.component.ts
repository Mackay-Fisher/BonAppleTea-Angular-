import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../menu-view/menu-item.model';
import { CartService } from '../cart-modal/cart-modal.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import { MenuService } from '../services/menu.service';
import { HttpClient } from '@angular/common/http';
import { StockService } from '../services/stock.service';

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
 * Represents the configuration object for table columns in the shopping cart.
 */
interface TableConfig {
  /**
   * The columns of the table.
   */
  columns: TableColumn[];
}

/**
 * `ShoppingCartComponent` manages the display and interactions within the shopping cart.
 * It allows users to view, modify, and proceed with their order. This component handles item removal, 
 * continuation to checkout, and order submission.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  /**
   * The configuration for the table, including the columns to display.
   */
  @Input() menuItems: MenuItem[] | undefined;
  /**
   * Event emitter to notify the parent component to close the popup.
   */
  @Output() continueClicked: EventEmitter<any> = new EventEmitter();
  /**
   * Event emitter to notify the parent component to close the popup.
   */
  @Output() cancelClicked: EventEmitter<any> = new EventEmitter();
  /**
   * The subscription to the cart items.
   */
  private cartSubscription: Subscription | undefined;
  /**
   * The subscription to the cart total.
   */
  showPopup: boolean = false;
  /**
   * The title of the popup, typically describing the content or purpose of the table.
   */
  popupTitle: string = '';
  /**
   *  The content to be displayed within the table.
   */
  popupContent: any;
  /**
   * The total price of the items in the cart.
   */
  cartTotal: string = "0";
  /**
   * The configuration for the table, including the columns to display.
   */

  tableConfig?: TableConfig;
  /**
   * The content to be displayed within the table.
   * @param cartService 
   * @param http 
   * @param orderService 
   */

  constructor(private stockService: StockService, private cartService: CartService, private http: HttpClient,  private orderService: OrdersService) { }

  popupConfig: TableConfig = {
    columns: [
      { key: 'menu_item_name', header: 'Name' },
      { key: 'menu_item_price', header: 'Price' }
    ]
  };
  /**
   * OnInit lifecycle hook to subscribe to the cart items.
   */
  ngOnInit() {
    // Subscribe to changes in the cartItems$
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      console.log(items);
      this.menuItems = items;
    });
  }
  /**
   * Removes an item from the cart.
   *
   * @param index The index of the item to be removed.
   */
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
  /**
   * Handles the continue action, triggers the checkout process.
   */
  onContinueClick() {
    this.continueClicked.emit();
    // const orderDetails = {
    //   order_timestamp: new Date(),
    //   order_items: this.menuItems?.map(item => item.menu_item_name),
    //   order_total: this.calculateTotal(),
    //   // Add other necessary details like employee_id, customer_id, etc.
    // };

    // do the popup
    /**
     * Shows the popup with the order details.
     */
    this.showPopup = true;
    /**
     * The title of the popup.
     */
    this.popupTitle = 'Checkout';
    /**
     * The content of the popup.
     */
    this.popupContent = this.menuItems;
    /**
     * The total price of the order.
     */
    this.cartTotal = this.calculateTotal().toString();

    // // Make an HTTP POST request to your backend endpoint
    // this.http.post('/api/create-order', orderDetails)
    //   .subscribe((response) => {
    //     console.log('Order created successfully:', response);
    //     this.cartService.clearCart();
    //     this.continueClicked.emit();
    //   }, (error) => {
    //     console.error('Error creating order:', error);
    //   });
    
    if (this.menuItems && this.menuItems.length > 0) {
      this.onCheckout();
      this.cartService.clearCart();
      this.menuItems = [];
    }
  }
  /**
   * Performs the checkout operation and updates the order history.
   */
  onCheckout() {
    const employeeId = 1; // Replace with actual employeeId
    const customerId = 1; // Replace with actual customerId

    let orderedItems: string[] = [];
    if (this.menuItems) {
      for (let i = 0; i < this.menuItems.length; i++) {
        orderedItems.push(this.menuItems[i].menu_item_name);
        this.stockService.updateQuantity(orderedItems[i]).subscribe(response => {
          console.log('Quantity updated successfully:', response);
        }, error => {
          console.error('Error updating quantity:', error);
        });
      }
    }

    // Update order history
    //@ts-ignore
    this.orderService.updateOrderHistory(this.menuItems, this.calculateTotal(), employeeId, customerId)
      .subscribe(response => {
        console.log('Order history updated successfully:', response);
      }, error => {
        console.error('Error updating order history:', error);
      });

    
  }
  /**
   * OnDestroy lifecycle hook to clean up subscriptions.
   */
  ngOnDestroy() {
    // Unsubscribe to prevent memory leak
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  /**
   * Emits an event to cancel the cart operation and clears the cart.
   */
  onCancelClick() {
    this.cancelClicked.emit();
    this.cartService.clearCart();
  }
  /**
   * Calculates the total price of items in the cart.
   *
   * @returns The total price of all items in the cart.
   */
  calculateTotal(): number {
    if (this.menuItems) {
      return this.menuItems.reduce((total, item) => total + parseFloat(item.menu_item_price), 0);
    } else {
      return 0;
    }
  }
}