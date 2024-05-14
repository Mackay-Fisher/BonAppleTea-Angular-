import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { IngredientsService } from '../services/ingredients.service';
import { InventoryService } from '../services/inventory.service';
import { OrderHistoryService } from '../services/order-history.service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
/**
 * This is the model for the table configuration.
 */
interface TableConfig {
  /**
   * The table's title
   */
  columns: TableColumn[];
}
/**
 *  This is the model for the table column.
 */
interface TableColumn {
  // The column's key
  /**
   * The column's key
   */
  key: string;
  /**
   * The column's header
   */
  // The column's header
  header: string;
}
/**
 * This is the model for the table row.
 */
interface InventoryMap {
  // The row's key
  /**
   * The row's key
   */
  [key: string]: number;
}
/**
 * This is the model for the inventory item.
 */
interface InventoryItem {
  // The item's id
  /**
   * The item's id
   */
  item_id: number;
  /**
   * The item's name
   */
  // The item's name
  item_name: string;
  /**
   * The item's quantity
   */
  // The item's quantity
  item_quantity: number;
}
/**
 * This is the model for the sales summary.
 */
interface SalesSummary {
  // The row's key
  /**
   * The row's key
   */
  [key: string]: number; // Adjust the key type if necessary
}

// Define an interface for the order item
/**
 * This is the model for the order item.
 */
interface OrderItem {
  /**
   * The item's id
   */
  // The item's id
  item_name: string;
  /**
   * The item's quantity
   */
   // or item_id if it's a number
  quantity: number;
}

/**
 * `ManagerViewComponent` serves as the main interface for the manager's dashboard.
 * It handles operations related to menu management, ingredients, inventory, and order history,
 * providing functionalities to refresh and manipulate these data sets.
 *
 * @Component Decorator that marks the class as an Angular component and provides metadata about the component.
 */
 @Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent implements OnInit {
  // Component properties
  /**
   * Boolean to track if the current user is a manager.
   */
  showPopup: boolean = false;
  /**
   * Boolean to track if the current user is a cashier.
   */
  showRestockReportPopup: boolean = false;
  /**
   * Boolean to track if the current user is a cashier.
   */
  popupTitle: string = '';
  /**
   * Boolean to track if the current user is a cashier.
   */
  start: string = '';
  /**
   * Boolean to track if the current user is a cashier.
   */
  end: string = '';
  /**
   * Boolean to track if the current user is a cashier.
   */
  popupContent: any;
  /**
   * Boolean to track if the current user is a cashier.
   */
  menu: any[] = [];
  /**
   * Boolean to track if the current user is a cashier.
   */
  ingredients: any[] = [];
  /**
   * Boolean to track if the current user is a cashier.
   */
  inventory: any[] = [];
  /**
   * Boolean to track if the current user is a cashier.
   */
  orderHistory: any[] = [];

  /**
   * Constructor for `ManagerViewComponent`.
   * 
   * @param MenuService Service to manage menu items.
   * @param IngredientsService Service to manage ingredients.
   * @param InventoryService Service to manage inventory.
   * @param OrderHistoryService Service to manage order history.
   */
  constructor(
    private MenuService: MenuService, 
    private IngredientsService: IngredientsService, 
    private InventoryService: InventoryService, 
    private OrderHistoryService: OrderHistoryService
  ) {}

  /**
   * OnInit lifecycle hook for initial component setup.
   */
  ngOnInit(): void {
    // Initialization logic can go here
  }

  /**
   * Refreshes the menu items by fetching the latest data from the `MenuService`.
   */
  refreshMenu(): void {
    this.MenuService.getMenu().subscribe(items => {
      this.menu = items;

      this.menu.forEach(item => {
        item.menu_item_name = this.formatSingleUnderscore(item.menu_item_name);
        item.menu_item_type = this.formatSingleUnderscore(item.menu_item_type);
        item.ingredients = this.formatCamelCaseArray(item.ingredients);
      });

      this.popupContent = this.menu;
    });
  }
  
  /**
   * Refreshes the ingredients by fetching the latest data from the `IngredientsService`.
   */
  refreshIngredients(): void {
    this.IngredientsService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;

      this.ingredients.forEach(item => {
        item.ingredient_name = this.formatSingleUnderscore(item.ingredient_name);
      });

      this.popupContent = this.ingredients;
    });
  }
  
  /**
   * Refreshes the inventory by fetching the latest data from the `InventoryService`.
   */
  refreshInventory(): void {
    this.InventoryService.getInventory().subscribe(invItems => {
      this.inventory = invItems;

      this.inventory.forEach(item => {
        item.item_name = this.formatSingleUnderscore(item.item_name);
      });

      this.popupContent = this.inventory;
    });
  }

  /**
   * Refreshes the order history by fetching the latest data from the `OrderHistoryService`.
   */
  lowInventItems: any[] = [];
  /**
   * Get all of the elements that have only sold 10 percent of their stock
   */
  lowIngredItems: any[] = [];
  /**
   * Get all of the elements that have only sold 10 percent of their stock
   */
  getLowStock(): void {
    this.InventoryService.getInventory().subscribe(invItems => {
      this.inventory = invItems;

      this.lowInventItems = this.inventory.filter(item => item.item_quantity < 500);

      this.lowInventItems.forEach(item => {
        item.item_quantity_to_order = 1500 - item.item_quantity;
      });
    });

    this.IngredientsService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      
      this.lowIngredItems = this.ingredients.filter(item => item.ingredient_quantity < 500);

      this.lowIngredItems.forEach(item => {
        item.item_quantity_to_order = 1500 - item.ingredient_quantity;
        item.item_name = item.ingredient_name;
        item.item_quantity = item.ingredient_quantity;
      });
      const temp = [...this.lowInventItems, ...this.lowIngredItems];

      temp.forEach(item => {
        item.item_name = this.formatCamelCase(item.item_name);
      });
      this.popupContent = temp
    });
  }  

  /**
   * gets the sales from that time period
   * @param start 
   * @param end 
   */
  refreshSales(start: string, end: string): void {
    this.OrderHistoryService.getOrderHistory().subscribe(ordItems => {
      this.orderHistory = ordItems;

      const startDate = new Date(start);
      startDate.setUTCHours(0, 0, 0, 0);

      const endDate = new Date(end);
      endDate.setUTCHours(23, 59, 59, 999);

      // console.log(ordItems);
      // console.log(startDate);
      // console.log(endDate);

      const ItemsInRange = this.orderHistory.filter(order => {
        const orderDate = new Date(order.order_timestamp);
        return orderDate > startDate && orderDate < endDate;
      });

      ItemsInRange.forEach(item => {
        item.order_items = this.formatOrderItems(item.order_items);
      });

      console.log(ItemsInRange)

      this.popupContent = ItemsInRange;
    });
  }
  /**
   * gets the sales from that time period
   * @param start 
   * @param end 
   */
  getExcess(start: string, end: string): void {
    let inventory_ingrident_map = new Map<string, string[]>();
    // const additionalItems = ['napkins', 'plastic_seals', 'cups', 'straws'];
    this.OrderHistoryService.getIngridents().subscribe(
      data => {
        data.forEach((item: { menu_item_name: string; ingredients: string[]; }) => {
          let itemIngredients = item.ingredients.slice(); // Create a copy of the ingredients array

          // // Check if the item has more than one ingredient and add additional items if so
          // if (itemIngredients.length > 1) {
          //   itemIngredients = itemIngredients.concat(additionalItems);
          // }

          inventory_ingrident_map.set(item.menu_item_name, itemIngredients);
        });
        console.log(inventory_ingrident_map); // This will log the map with the data
      },
      error => {
        console.error('Error:', error); // This will log any error that occurs during the request
      }
    );

    let ogIngrdientmap = new Map<string, number>();
      this.OrderHistoryService.getIng().subscribe(
        data => {
          data.forEach((item: { ingredient_name: string;  ingredient_quantity : number; }) => {
            ogIngrdientmap.set(item.ingredient_name, item.ingredient_quantity);
        });
        console.log(ogIngrdientmap)
      },
        error => {
          console.error('Error:', error); // This will log any error that occurs during the request
        }
      );
    this.OrderHistoryService.getOrderHistory().subscribe(ordItems => {
      this.orderHistory = ordItems;

      // Initialize initialInventory
      const initialInventory: InventoryMap = {};
      this.InventoryService.getInventory().subscribe((inventoryItems: InventoryItem[]) => {
        inventoryItems.forEach((item: InventoryItem) => {
          initialInventory[item.item_name] = item.item_quantity;
        });

        console.log(initialInventory); // Log the map of item counts
      });

      const startDate = new Date(start);
      startDate.setUTCHours(0, 0, 0, 0);
  
      const endDate = new Date(end);
      endDate.setUTCHours(23, 59, 59, 999);
  
      const itemsInRange = this.orderHistory.filter(order => {
        const orderDate = new Date(order.order_timestamp);
        return orderDate >= startDate && orderDate <= endDate;
      });

      console.log(itemsInRange)

      // Initialize salesSummary with the correct type
      const salesSummary: SalesSummary = {};
      let ingredientCountMap = new Map<string, number>();
      itemsInRange.forEach(order => {
      order.order_items.forEach((item: OrderItem) => {
        //@ts-ignore
        const ingredients = inventory_ingrident_map.get(item) || [];
        ingredients.forEach(ingredient => {
          const currentCount = ingredientCountMap.get(ingredient) || 0;
          ingredientCountMap.set(ingredient, currentCount + 1);
        });
      });
    });

    console.log("Ingredient Usage Count:", ingredientCountMap);
      // console.log("passed sales")
      let excessIngredients: { excessIngredients: string }[] = [];
      ingredientCountMap.forEach((count, ingredient) => {
        //@ts-ignore
        if(count < (ogIngrdientmap.get(ingredient)/10)){

            excessIngredients.push({ excessIngredients:this.formatCamelCase(ingredient) });
        }
      });
      console.log(excessIngredients);
      this.popupContent = excessIngredients;
    });
  }

  // FUNCTIONS FOR FORMATTING OUTPUT
  //Takes a string of items formatted with _ for a space and fixes them
  /**
   * Takes a string of items formatted with _ for a space and fixes them
   * @param ordItems 
   * @returns  formatted string
   */
  formatOrderItems(ordItems: string[]): string {
    const formatted = ordItems.map(item => {
      let formattedItem = item.replace(/_/g, ' ');
  
      formattedItem = formattedItem.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
  
      return formattedItem;
    });
  
    return formatted.join(', ');
  }
  /**
   * Takes a string of items formatted with _ for a space and fixes them
   * @param ordItem 
   * @returns formatted string
   */
  //Same as above but for only one string
  formatSingleUnderscore(ordItem: string): string {
    let formattedItem = ordItem.replace(/_/g, ' ');
  
    formattedItem = formattedItem.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  
    return formattedItem;
  }
  /**
   * Takes a string of items formatted with camelCase and fixes them
   * @param name 
   * @returns formatted string
   */
  // Fixes camelCase words (one string)
  formatCamelCase(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  }
  /**
   * Takes a string of items formatted with camelCase and fixes them
   * @param names 
   * @returns formatted string
   */
  // Same as above but for array of strings
  formatCamelCaseArray(names: string[]): string[] {
    return names.map(name => {
      return name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }).split(',').join(', ');
    });
  }
  
  /**
   * This function is called when the user clicks on the "View Inventory" button
   */
  tableConfig?: TableConfig;
/**
 * This hold all of the possible table configs for the value
 */
  menuTableConfig: TableConfig = {
    columns: [
      { key: 'menu_item_id', header: 'ID' },
      { key: 'menu_item_name', header: 'Name' },
      { key: 'menu_item_type', header: 'Type' },
      { key: 'menu_item_price', header: 'Price' },
      { key: 'ingredients', header: 'Ingredients' }
    ]
  };
  /**
   * This hold all of the possible table configs for the value
   */
  ingredientsTableConfig: TableConfig = {
    columns: [
      { key: 'ingredient_id', header: 'ID' },
      { key: 'ingredient_name', header: 'Name' },
      { key: 'ingredient_quantity', header: 'Quantity' }
    ]
  };
/**
 * This hold all of the possible table configs for the value
 */
  inventoryTableConfig: TableConfig = {
    columns: [
      { key: 'item_id', header: 'ID' },
      { key: 'item_name', header: 'Name' },
      { key: 'item_quantity', header: 'Quantity' }
    ]
  };
/**
 * This hold all of the possible table configs for the value
 */
  restockReport: TableConfig = {
    columns: [
      { key: 'item_name', header: 'Name' },
      { key: 'item_quantity', header: 'Current Quantity' },
      { key: 'item_quantity_to_order', header: 'Amount to Order' }
    ]
  };
/**
 * This hold all of the possible table configs for the value
 */
  salesReport: TableConfig = {
    columns: [
      { key: 'order_timestamp', header: 'Date' },
      { key: 'order_total', header: 'Price' },
      { key: 'order_items', header: 'Items Ordered' }
    ]
  };
/**
 * This hold all of the possible table configs for the value
 */
  excessReport: TableConfig = {
    columns: [
      { key: 'excessIngredients',  header: 'Excess Item' }
    ]
  };
  /**
   * This hold all of the possible table configs for the value
   * @param type 
   */
  openPopup(type: string) {
    this.showPopup = true;
    switch (type) {
      case 'menu':
        this.popupTitle = 'Edit Menu';
        this.tableConfig = this.menuTableConfig;
        this.refreshMenu();
        break;
      case 'ingredients':
        this.popupTitle = 'Edit Ingredients';
        this.tableConfig = this.ingredientsTableConfig;
        this.refreshIngredients();
        break;
      case 'inventory':
        this.popupTitle = 'Edit Inventory';
        this.tableConfig = this.inventoryTableConfig;
        this.refreshInventory();
        break;
    }
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    if (this.editType === 'menu') {
      this.popupTitle = 'Edit Menu';
    } else if (this.editType === 'ingredients') {
      this.popupTitle = 'Edit Ingredients';
    } else if (this.editType === 'inventory') {
      this.popupTitle = 'Edit Inventory';
    }
  }

  // ACTION BUTTONS
  /**
   * This function is called when the user clicks on the "Add" button
   */
  showEditPopup: boolean = false;
  /**
   * This function is called when the user clicks on the "Add" button
   */
  selectedItem: any = null;
  /**
   * This function is called when the user clicks on the "Add" button
   */
  currentAction: 'edit' | 'delete' | 'add' | null = null;
  /**
   * This function is called when the user clicks on the "Add" button
   * @param item 
   */
  editRow(item: any): void {
    console.log('Editing item, opening edit popup', item);
    this.currentAction = 'edit';
    this.selectedItem = item;
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    if (this.editType === 'menu') {
      this.popupTitle = 'Edit Menu';
    } else if (this.editType === 'ingredients') {
      this.popupTitle = 'Edit Ingredients';
    } else if (this.editType === 'inventory') {
      this.popupTitle = 'Edit Inventory';
    }
    this.showPopup = false;
    this.showEditPopup = true;
  }  
  /**
   * This function is called when the user clicks on the "Add" button
   * @param item 
   */
  deleteRow(item: any): void {
    console.log('Deleting item:', item);
    if (this.editType === 'menu') {
      this.popupTitle = 'Edit Menu';
    } else if (this.editType === 'ingredients') {
      this.popupTitle = 'Edit Ingredients';
    } else if (this.editType === 'inventory') {
      this.popupTitle = 'Edit Inventory';
    }
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    this.currentAction = 'delete';
    this.selectedItem = item;
    this.showConfirmationPopup = true;
    this.showPopup = false;
  }

  // EDIT CONFIRMATIONS
  /**
   * This function is called when the user clicks on the "Add" button
   */
  onEditCancel(): void {
    this.selectedItem = null;
    this.showEditPopup = false;
    this.showPopup = true; // Reopen the main popup if needed
  }
  /**
   * This function is called when the user clicks on the "Add" button
   * @param editedItem 
   */
  onItemSave(editedItem: any): void {
    // Process the edited item
    if (this.popupTitle === 'Edit Menu') {
      this.refreshMenu();
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.refreshIngredients();
    } else if (this.popupTitle === 'Edit Inventory') {
      this.refreshInventory();
    }
    this.selectedItem = editedItem;
    this.showEditPopup = false;
    this.showConfirmationPopup = true;
  }  

  // CONFIRMATION POPUP
  /**
   * This function is called when the user clicks on the "Add" button
   */
  showConfirmationPopup: boolean = false;
  /**
   * This function is called when the user clicks on the "Add" button
   */
  editType: 'menu' | 'ingredients' | 'inventory' | null = null;
  /**
   * This function is called when the user clicks on the "Add" button
   * @param item 
   */
  onItemConfirm(item: any): void {
    this.selectedItem = item;
    this.showConfirmationPopup = false;
    if (this.popupTitle === 'Edit Menu') {
      if (this.currentAction === 'edit') {
        this.MenuService.editMenuItem(item.menu_item_id, item).subscribe(() => {
          this.refreshMenu();
        });
      } else if (this.currentAction === 'delete') {
        console.log('Deleting menu item', item);
        this.MenuService.deleteMenuItem(item.menu_item_id).subscribe(() => {
          this.refreshMenu();
        });
      }
    } else if (this.popupTitle === 'Edit Ingredients') {
      if (this.currentAction === 'edit') {
        this.IngredientsService.editIngredient(item.ingredient_id, item).subscribe(() => {
          this.refreshIngredients();
        });
      } else if (this.currentAction === 'delete') {
        this.IngredientsService.deleteIngredient(item.ingredient_id).subscribe(() => {
          this.refreshIngredients();
        });
      }
    } else if (this.popupTitle === 'Edit Inventory') {
      if (this.currentAction === 'edit') {
        this.InventoryService.editInventoryItem(item.item_id, item).subscribe(() => {
          this.refreshInventory();
        });
      } else if (this.currentAction === 'delete') {
        this.InventoryService.deleteInventoryItem(item.item_id).subscribe(() => {
          this.refreshInventory();
        });
      }
    } else if (this.popupTitle === 'Quick Add') {
      if (this.editType === 'menu') {
        this.MenuService.addMenuItem(item).subscribe(() => {
          this.refreshMenu();
        });
        console.log('Adding menu item', item.menu_item_name);
      } else if (this.editType === 'ingredients') {
        this.IngredientsService.addIngredient(item).subscribe(() => {
          this.refreshIngredients();
        });
      } else if (this.editType === 'inventory') {
        this.InventoryService.addInventoryItem(item).subscribe(() => {
          this.refreshInventory();
        });
      }
    }
    this.showPopup = true;
    if (this.popupTitle === 'Add Seasonal Item') {
      this.MenuService.addMenuItem(item).subscribe(() => {
        this.refreshMenu();
      });
      this.showPopup = false;
    }
  }
/**
 * This function is called when the user clicks on the "Add" button
 */
  onItemDecline(): void {
    this.showConfirmationPopup = false;
    if (this.popupTitle === 'Edit Menu') {
      this.showPopup = true;
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.showPopup = true;
    } else if (this.popupTitle === 'Edit Inventory') {
      this.showPopup = true;
    } else if (this.popupTitle === 'Quick Add') {
      this.showQuickAddPopup = true;
    } else if (this.popupTitle === 'Add Seasonal Item') {
      this.showSeasonalItemPopup = true;
    }
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    if (this.editType === 'menu') {
      this.popupTitle = 'Edit Menu';
    } else if (this.editType === 'ingredients') {
      this.popupTitle = 'Edit Ingredients';
    } else if (this.editType === 'inventory') {
      this.popupTitle = 'Edit Inventory';
    }
  }

  // QUICK ADD POPUP
  /**
   * This function is called when the user clicks on the "Add" button
   */
  showQuickAddPopup: boolean = false;
/**
 *  This function is called when the user clicks on the "Add" button
 * @param type 
 */
  quickAdd(type: string): void {
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    this.popupTitle = 'Quick Add';
    console.log('Quick add');
    this.showPopup = false;
    this.showQuickAddPopup = true;
  }
  /**
   * This function is called when the user clicks on the "Add" button
   */
  onQuickAddCancel(): void {
    if (this.popupTitle === 'Edit Menu') {
      this.editType = 'menu';
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.editType = 'ingredients';
    } else if (this.popupTitle === 'Edit Inventory') {
      this.editType = 'inventory';
    }
    if (this.editType === 'menu') {
      this.popupTitle = 'Edit Menu';
    } else if (this.editType === 'ingredients') {
      this.popupTitle = 'Edit Ingredients';
    } else if (this.editType === 'inventory') {
      this.popupTitle = 'Edit Inventory';
    }
    this.showQuickAddPopup = false;
    this.showPopup = true;
  }
  /**
   * This function is called when the user clicks on the "Add" button
   * @param newItem 
   */
  onItemAdd(newItem: any): void {
    // Process the new item
    this.currentAction = 'add';
    if (this.popupTitle === 'Edit Menu') {
      this.refreshMenu();
    } else if (this.popupTitle === 'Edit Ingredients') {
      this.refreshIngredients();
    } else if (this.popupTitle === 'Edit Inventory') {
      this.refreshInventory();
    }
    this.selectedItem = newItem;
    this.showQuickAddPopup = false;
    this.showConfirmationPopup = true;
  }

  // SEAOSONAL ITEM POPUP
  /**
   * This function is called when the user clicks on the "Add" button
   */
  showSeasonalItemPopup: boolean = false;
/**
 * This function is called when the user clicks on the "Add" button
 * @param type 
 */
  seasonalItem(type: string): void {
    this.popupTitle = 'Add Seasonal Item';
    this.currentAction = 'add';
    console.log('Seasonal item');
    this.showSeasonalItemPopup = true;
  }
/**
 * This function is called when the user clicks on the "Add" button
 */
  onSeasonalItemCancel(): void {
    this.showSeasonalItemPopup = false;
  }
/**
 * This function is called when the user clicks on the "Add" button
 * @param newItem 
 */
  seasonalItemAdd(newItem: any): void {
    this.popupTitle = 'Add Seasonal Item';
    this.selectedItem = newItem;
    this.showSeasonalItemPopup = false;
    this.showConfirmationPopup = true;
  }
  /**
   * This function is called when the user clicks on the "Add" button
   * @param type 
   * @param start 
   * @param end 
   */
  // OTHER
  reportPopup(type: string, start?: string, end?: string) {
    this.showRestockReportPopup = true;
    switch (type) {
      case 'restock': 
        this.popupTitle = 'Restock Report';
        this.tableConfig = this.restockReport;
        this.getLowStock();
        break;
      case 'sales': 
        if (!start) {
          start = "2023-01-01";
        }
        if (!end) {
          end = "2023-03-01";
        }
        this.popupTitle = 'Sales Report';
        this.tableConfig = this.salesReport;
        this.refreshSales(start, end);
        break;
      case 'excess':
        this.popupTitle = 'Excess Report';
        this.tableConfig = this.excessReport;
        if (!start) {
          start = "2023-01-01";
        }
        if (!end) {
          end = "2023-03-01";
        }
        this.getExcess(start, end);
        break;
      }
  }

  /**
   * This function is called when the user clicks on the "Add" button
   */
  clickSalesReport() {
    // Do something cool
    console.log('clickSalesReport()');
  }
  /**
   *  This function is called when the user clicks on the "Add" button
   */
  clickExcessReport() {
    // Do something cool
    console.log('clickExcessReport()');
  }
  /**
   *  This function is called when the user clicks on the "Add" button
   */
  clickRestockReport() {
    // Do something cool
    console.log('clickStockReport()');
  }
  /**
   *  This function is called when the user clicks on the "Add" button
   */
  clickPPReport() {
    // Do something cool
    console.log('clickPPReport()');
  }
  /**
   *  This function is called when the user clicks on the "Add" button
   */
  clickIPReport() {
    // Do something cool
    console.log('clickIPReport()');
  }
}




