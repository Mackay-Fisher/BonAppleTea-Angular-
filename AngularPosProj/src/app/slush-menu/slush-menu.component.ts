import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { StockService } from '../services/stock.service';
import { forkJoin } from 'rxjs';
/**
 * Represents the structure of a menu item.
 */
/**
 * Interface for a menu item.
 */
 interface MenuItem {
  /**
   * The id of the menu item.
   */
  menu_item_id: number;
  /**
   * The name of the menu item.
   */
  menu_item_name: string;
  /**
   * The type of the menu item.
   */
  menu_item_type: string;
  /**
   * The price of the menu item.
   */
  menu_item_price: string;
  /**
   * The ingredients of the menu item.
   */
  ingredients: string[];
  /**
   * The image of the menu item.
   */
  image: string;
  /**
   * The toppings of the menu item.
   */
  description: string;
  /**
   * The toppings of the menu item.
   */
  added_toppings: string[];
  /**
   * The sugar level of the menu item.
   */
  sugar_level: string;
  /**
   * The ice level of the menu item.
   */
  ice_level: string;
  /**
   * The sugar level of the menu item.
   */
  additional_info: string;
}

/**
 * `SlushMenuComponent` displays a menu of slush items.
 * It utilizes the `MenuService` to fetch and display a variety of slush options and other categories.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-slush-menu',
  templateUrl: './slush-menu.component.html',
  styleUrls: ['./slush-menu.component.scss']
})
export class SlushMenuComponent implements OnInit {
  /**
   * The data to be displayed in the table.
   */
  FlavoredTeaData = {};
  /**
   * The menu items to be displayed.
   */
  menuItems: MenuItem[] = [];
    /**
   * The data to track stock of each item
   */
    stock: { name: string, quantity: any }[] = [];
  /**
   * The data to be displayed in the table.
   */
  tableData: any[] = [{items: [] }];

  /**
   * Constructor for `SlushMenuComponent`.
   * 
   * @param menuService Service to fetch and manage menu items.
   */
  constructor(private menuService: MenuService,
    private stockService: StockService) {}

  /**
   * OnInit lifecycle hook to fetch slush menu items.
   */
  ngOnInit(): void {
    this.fetchMenuItemsByType('slush');
  }

  /**
   * Fetches menu items by a specific type.
   *
   * @param type The type of menu items to fetch (e.g., 'flavored_tea', 'coffee').
   */
  fetchMenuItemsByType(type: string): void {
    this.menuService.getMenuByType(type).subscribe(data => {
      this.menuItems = [...this.menuItems, ...data];

      const stockRequests = this.menuItems.map(item => this.stockService.findQuantity(item.menu_item_name));

      forkJoin(stockRequests).subscribe(stockData => {
        this.stock = stockData.map((quantity, index) => ({
          name: this.menuItems[index].menu_item_name,
          quantity: quantity
        }));
        console.log(this.stock);
      });
    });
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
