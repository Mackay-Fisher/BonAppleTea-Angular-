import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { response } from 'express';
import { MenuItem } from '../menu-view/menu-item.model';
import { CartService } from '../cart-modal/cart-modal.service';
import { ActiveComponentService } from '../services/currentcomp.service';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../services/orders.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockService } from '../services/stock.service';
import { forkJoin } from 'rxjs';
// Additional interfaces can be documented here

/**
 * Represents a configuration object for table columns in the cashier's view.
 */
interface TableConfig {
  /**
   * The columns of the table.
   */
  columns: TableColumn[];
}

/**
 * Represents the structure of a single column in the table.
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
 * The `CashierViewComponent` serves as the interactive interface for the cashier role.
 * It provides functionalities related to menu item selection, order customization, and order processing.
 * This component works closely with various services to handle the business logic associated with the cashier's operations.
 *
 * @Component Marks the class as an Angular component and provides metadata about the component.
 */

@Component({
  selector: 'app-cashier-view',
  templateUrl: './cashier-view.component.html',
  styleUrls: ['./cashier-view.component.scss']
})
export class CashierViewComponent implements OnInit {
  //Document Properties here
  /**
   * The configuration for the table, including the columns to display.
   */
  menuItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  flavoredTeaItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  milkTeaItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  signatureMilkTeaItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  slushItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  coffeeItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  smoothiesItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  employeeCreationsItems: MenuItem[] = [];
  /**
   * The configuration for the table, including the columns to display.
   */
  toppingItems: MenuItem[] = [];
  formSugar!: FormGroup;
  formIce!: FormGroup;
  sugar = [
    { label: 'No Sugar', value: 'noSugar' },
    { label: '50%', value: '50' },
    { label: '100%', value: '100' }
  ];

  ice = [
    { label: 'No Ice', value: 'noIce' },
    { label: 'Less Ice', value: 'lessIce' },
    { label: 'Normal Ice', value: 'normalIce' }
  ];
  /**
   * The configuration for the table, including the columns to display.
   */
  selectedToppings: Set<number> = new Set();
  /**
   * The configuration for the table, including the columns to display.
   */
  private cartSub: Subscription | undefined;
  /**
   * The configuration for the table, including the columns to display.
   */
  showPopup: boolean = false;
  /**
   * The configuration for the table, including the columns to display.
   */
  popupTitle: string = '';
  /**
   * The configuration for the table, including the columns to display.
   */
  popupContent: any;
  /**
   * The configuration for the table, including the columns to display.
   */
  cartTotal: string = "0";
  /**
   * The configuration for the table, including the columns to display.
   */
  tableConfig?: TableConfig;

  tableData: any[] = [
    { name: 'Flavored Tea', items: [] },
    { name: 'Milk Tea', items: [] },
    { name: 'Signature Milk Tea', items: [] },
    { name: 'Slush', items: [] },
    { name: 'Coffee', items: [] },
    { name: 'Smoothies', items: [] },
    { name: 'Employee Creations', items: [] }
  ];

    /**
   * The data to track stock of each item
   */
    stock: { name: string, quantity: any }[] = [];

  /**
 * Constructor for the `CashierViewComponent`.
 * @param activeComponentService Service to manage the current active component.
 * @param cartService Service to manage the cart operations.
 * @param menuService Service to fetch menu items.
 * @param router Angular Router for navigation.
 * @param http HttpClient to perform HTTP requests.
 * @param orderService Service to manage order-related operations.
 */
  constructor(private stockService: StockService, private activeComponentService: ActiveComponentService,
    private cartService: CartService, private menuService: MenuService, private router: Router, private http: HttpClient, private orderService: OrdersService, private fb: FormBuilder) {
    this.cartSub = this.cartService.cartItems$.subscribe(
      items => this.menuItems = items
    );
  }
  /**
 * OnInit lifecycle hook to initialize component properties and fetch menu items.
 */
  ngOnInit() {
    /**
     * Sets the current active component to `CashierViewComponent`.
     */
    this.activeComponentService.setActiveComponent('CashierViewComponent');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('flavored_tea');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('milk_tea');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('toppings');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('signature_milk_tea');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('slush');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('coffee');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('smoothies');
    /**
     * Fetches menu items by type.
     */
    this.fetchMenuItemsByType('employee_creations');

    this.formSugar = this.fb.group({
      sugar: this.fb.group({
        selectedLevel: []
      })
    });

    this.formIce = this.fb.group({
      ice: this.fb.group({
        selectedLevel: []
      })
    });
  }
  /**
   * Fetches menu items by a given type.
   */
  public menuVisibility: { [key: string]: boolean } = {
    'flavoredTea': false,
    'milkTea': false,
    'signatureMilkTea': false,
    'slush': false,
    'coffee': false,
    'smoothies': false,
    'employeeCreations': false
  };

  // Function to toggle the visibility of a menu section
  toggleMenu(section: string) {
    this.menuVisibility[section] = !this.menuVisibility[section];
  }
  /**
 * Fetches menu items by a given type.
 * @param type The type of menu items to fetch, e.g., 'flavored_tea', 'milk_tea'.
 */
  fetchMenuItemsByType(type: string) {

    if (type === 'flavored_tea') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.flavoredTeaItems = [...this.flavoredTeaItems, ...data];

        const stockRequests = this.flavoredTeaItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.flavoredTeaItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'milk_tea') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.milkTeaItems = [...this.milkTeaItems, ...data];

        const stockRequests = this.milkTeaItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.milkTeaItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'signature_milk_tea') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.signatureMilkTeaItems = [...this.signatureMilkTeaItems, ...data];

        const stockRequests = this.signatureMilkTeaItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.signatureMilkTeaItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'slush') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.slushItems = [...this.slushItems, ...data];

        const stockRequests = this.slushItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.slushItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'coffee') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.coffeeItems = [...this.coffeeItems, ...data];

        const stockRequests = this.coffeeItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.coffeeItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'smoothies') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.smoothiesItems = [...this.smoothiesItems, ...data];

        const stockRequests = this.smoothiesItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.smoothiesItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'employee_creations') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.employeeCreationsItems = [...this.employeeCreationsItems, ...data];

        const stockRequests = this.employeeCreationsItems.map(item => this.stockService.findQuantity(item.menu_item_name));

        forkJoin(stockRequests).subscribe(stockData => {
          this.stock.push(...stockData.map((quantity, index) => ({
            name: this.employeeCreationsItems[index].menu_item_name,
            quantity: quantity
          })));
          console.log(this.stock);
        });
      });
    } else if (type === 'toppings') {
      this.menuService.getMenuByType(type).subscribe(data => {
        this.toppingItems = [...this.toppingItems, ...data];
      });
    }

  }

  /**
   * Event handler for checkbox changes to toggle the selection of toppings.
   * Delegates to the `onToppingChange` method to handle the state change.
   *
   * @param event The DOM event triggered when a topping checkbox changes.
   * @param menuItem The menu item to which the topping belongs.
   * @param topping The topping associated with the checkbox.
   */
  onToppingCheckboxChange(event: Event, menuItem: MenuItem, topping: MenuItem): void {
    const checkbox = event.target as HTMLInputElement;
    this.onToppingChange(topping.menu_item_id, checkbox.checked, menuItem, topping);
  }

  /**
   * Handles the change of topping selection, adding or removing toppings from the menu item.
   *
   * @param toppingId The unique identifier of the topping.
   * @param isChecked The boolean state of the checkbox, true if checked.
   * @param menuItem The menu item to which the topping is added or removed.
   * @param topping The topping object that is being added or removed.
   */
  onToppingChange(toppingId: number, isChecked: boolean, menuItem: MenuItem, topping: MenuItem): void {
    if (isChecked) {
      this.toppingAdd(menuItem, topping);
      this.selectedToppings.add(toppingId);
    } else {
      this.toppingRemove(menuItem, topping);
      this.selectedToppings.delete(toppingId);
    }
  }

  /**
   * Adds a topping to a menu item and updates the price accordingly.
   *
   * @param item The menu item to which the topping is being added.
   * @param topping The topping that is being added to the menu item.
   */
  toppingAdd(item: MenuItem, topping: MenuItem): void {
    if (!item.added_toppings) {
      item.added_toppings = [];
    }
    item.added_toppings.push(topping.menu_item_name);
    const toppingPrice = parseFloat(topping.menu_item_price);
    item.menu_item_price = (parseFloat(item.menu_item_price) + toppingPrice).toFixed(2);
  }

  /**
   * Removes the last added topping from a menu item and updates the price accordingly.
   *
   * @param item The menu item from which the topping is being removed.
   * @param topping The topping that is being removed from the menu item.
   */
  toppingRemove(item: MenuItem, topping: MenuItem): void {
    if (!item.added_toppings) {
      item.added_toppings = [];
    }
    item.added_toppings.pop();
    const toppingPrice = parseFloat(topping.menu_item_price);
    item.menu_item_price = (parseFloat(item.menu_item_price) - toppingPrice).toFixed(2);
  }


  /**
   * Adds an item to the cart through the CartService.
   *
   * @param item The menu item being added to the cart.
  */
  onAdd(item: MenuItem) {
    let newItem: MenuItem = { ...item };
    this.cartService.addItem(newItem);
  }
  /**
   * Prepares the component state for checkout, displaying a popup if necessary.
   */
  onContinue(): void {
    this.showPopup = true;
    this.popupTitle = 'Checkout';
    this.popupContent = this.menuItems;
    this.cartTotal = this.calculateTotal().toString();
    if (this.menuItems.length > 0) {
      this.onCheckout();
    }
  }

  /**
   * Finalizes the checkout process, updating the order history and clearing the current cart.
   */
  onCheckout(): void {
    const employeeId = 1; // This should be dynamically determined or passed in.
    const customerId = 1; // This should be dynamically determined or passed in.
    let orderedItems: string[] = [];
    for (let i = 0; i < this.menuItems.length; i++) {
      orderedItems.push(this.menuItems[i].menu_item_name);
      this.stockService.updateQuantity(orderedItems[i]).subscribe(response => {
        console.log('Quantity updated successfully:', response);
      }, error => {
        console.error('Error updating quantity:', error);
      });
    }
    this.orderService.updateOrderHistory(this.menuItems, this.calculateTotal(), employeeId, customerId)
      .subscribe(response => {
        console.log('Order history updated successfully:', response);
      }, error => {
        console.error('Error updating order history:', error);
      });
    this.cartService.clearCart();
    this.menuItems = [];
  }

  /**
   * Cancels the current order, clearing the cart and resetting related component state.
   */
  onCancel(): void {
    this.cartService.clearCart();
    this.menuItems = [];
  }

  /**
   * Unsubscribes from any subscriptions to prevent memory leaks when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  /**
   * Calculates the total price of all items in the cart.
   *
   * @returns The total price of all items as a number.
   */
  calculateTotal(): number {
    if (this.menuItems) {
      return this.menuItems.reduce((total, item) => total + parseFloat(item.menu_item_price), 0);
    } else {
      return 0;
    }
  }
  onSugarCheckboxChange(event: Event, level: string, item: MenuItem) {
    const radio = event.target as HTMLInputElement;
    this.onSugarChange(level, radio.checked, item);
  }

  onSugarChange(sugarLevel: string, isChecked: boolean, item: MenuItem) {
    if (isChecked) {
      item.sugar_level = sugarLevel;
    }
    console.log("Sugar level changed to:", item.sugar_level);
    console.log(item);
  }

  onIceCheckboxChange(event: Event, level: string, item: MenuItem) {
    const radio = event.target as HTMLInputElement;
    this.onIceChange(level, radio.checked, item);
  }

  onIceChange(iceLevel: string, isChecked: boolean, item: MenuItem) {
    console.log("here is checked");
    if (isChecked) {
      item.ice_level = iceLevel;
    }
    console.log("Ice level changed to:", item.ice_level);
    console.log(item);
  }

    /**
   * Checks if an item is in stock
   *
   * @param name The name of the item we want to check the stock of
   */
    itemInStock(name: string): boolean {
      const stockEntry = this.stock.find(entry => entry.name === name);
      if (stockEntry && stockEntry.quantity && stockEntry.quantity[0] && stockEntry.quantity[0].stock > 0) {
        return true;
      } else {
        return false;
      }
    }
}