import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../menu-view/menu-item.model';
import { CartService } from './cart-modal.service';

/**
 * `CartModalComponent` is responsible for displaying the items that are currently in the cart.
 * It allows users to remove items from the cart, proceed with the checkout, or cancel the operation.
 *
 * @Component Decorator that marks the class as an Angular component, specifies the selector, template, and styles.
 */
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent {
  /**
   * A list of menu items that are currently in the user's cart.
   */
  @Input() menuItems: MenuItem[] | undefined;

  /**
   * An event emitter that notifies the parent component when the user clicks the 'continue' button.
   */
  @Output() continueClicked: EventEmitter<any> = new EventEmitter();

  /**
   * An event emitter that notifies the parent component when the user clicks the 'cancel' button.
   */
  @Output() cancelClicked: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor for `CartModalComponent`.
   * 
   * @param cartService The service responsible for managing the cart operations.
   */
  constructor(private cartService: CartService) { }

  /**
   * OnInit lifecycle hook to subscribe to the cartService's cartItems$ observable to fetch and update the list of menu items in the cart.
   */
  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.menuItems = items;
    });
  }

  /**
   * Removes an item from the cart based on the given index.
   * 
   * @param index The index of the item to be removed from the cart.
   */
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  /**
   * Emits an event when the user clicks the 'continue' button to proceed with the checkout process.
   */
  onContinueClick() {
    this.continueClicked.emit();
  }

  /**
   * Emits an event and clears the cart when the user clicks the 'cancel' button to cancel the checkout process.
   */
  onCancelClick() {
    this.cancelClicked.emit();
    this.cartService.clearCart();
  }

  /**
   * Calculates the total price of all items in the cart.
   * 
   * @returns The total price as a number.
   */
  calculateTotal(): number {
    if (this.menuItems) {
      return this.menuItems.reduce((total, item) => total + parseFloat(item.menu_item_price), 0);
    } else {
      return 0;
    }
  }
}
