import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { response } from 'express';
import { StockService } from '../services/stock.service';
import { forkJoin } from 'rxjs';
/**
 * `EmployeeCreationsMenuComponent` provides a user interface for adding seasonal menu items.
 * It enables the selection of item types, ingredients, and creation of new menu items.
 */
@Component({
  selector: 'app-employee-creations-menu',
  templateUrl: './employee-creations-menu.component.html',
  styleUrls: ['./employee-creations-menu.component.scss']
})
export class EmployeeCreationsMenuComponent implements OnInit{
  /**
   * Array of menu item types available for selection.
   */
  tableData: any[] = [{items: [] }];
  /**
   * Array of menu item types available for selection.
   */
  menuItems:MenuItem[] = [];
    /**
   * The data to track stock of each item
   */
    stock: { name: string, quantity: any }[] = [];
  /**
   * Constructor for `EmployeeCreationsMenuComponent`.
   * @param menuService 
   */
  constructor(
    private menuService: MenuService,
    private stockService: StockService) 
    {
  } 
  /**
   * OnInit lifecycle hook to fetch available menu item types and ingredient names.
   */
  ngOnInit() { 
    this.fetchMenuItemsByType('employee_creations');
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