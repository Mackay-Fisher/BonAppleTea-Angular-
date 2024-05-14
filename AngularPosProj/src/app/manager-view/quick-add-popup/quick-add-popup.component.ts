import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

import { MenuService } from 'src/app/services/menu.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
/**
 * `QuickAddPopupComponent` is designed to provide a quick add functionality for menu items, inventory items, or ingredients.
 * It allows for the quick creation of new items and emits events based on user actions.
 *
 * @Component Decorator that marks the class as an Angular component and specifies metadata about the component.
 */
@Component({
  selector: 'app-quick-add-popup',
  templateUrl: './quick-add-popup.component.html',
  styleUrls: ['./quick-add-popup.component.scss']
})
export class QuickAddPopupComponent {
    /**
   * The type of item to be added: menu, inventory, or ingredients.
   */
  @Input() editType: 'menu' | 'inventory' | 'ingredients' | null = null;
    /**
   * Event emitter for cancelling the add operation.
   */
  @Output() cancel = new EventEmitter<void>();
    /**
   * Event emitter for adding a new item.
   */
  @Output() add = new EventEmitter<any>();
    /**
   * Formats a string by replacing underscores with spaces and capitalizing each word.
   * This method is used to format item names that are typically stored with underscores.
   *
   * @param ordItem The original string with underscores.
   * @returns The formatted string with spaces and capitalized words.
   */
  formatSingleUnderscore(ordItem: string): string {
    let formattedItem = ordItem.replace(/_/g, ' ');
  
    formattedItem = formattedItem.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  
    return formattedItem;
  }
  /**
   * Event emitter for cancelling the add operation.
   */
  addedMenuItemName: string = '';
  /**
   * Event emitter for adding a new item.
   */
  addedMenuItemPrice: string = '';
  /**
   * Event emitter for cancelling the add operation.
   */
  addedMenuItemType: string = '';
  /**
   * Event emitter for adding a new item.
   */
  addedMenuItemIngredients: string = '';
  /**
   * Event emitter for cancelling the add operation.
   */

  addedInventoryItemName: string = '';
  /**
   * Event emitter for adding a new item.
   */
  addedInventoryItemQuantity: string = '';
  /**
   * Event emitter for cancelling the add operation.
   */
  addedIngredientName: string = '';
  /**
   * Event emitter for adding a new item.
   */
  addedIngredientQuantity: string = '';
    /**
   * Constructor for `QuickAddPopupComponent`.
   * 
   * @param menuService Service to handle menu item operations.
   * @param ingredientsService Service to handle ingredient operations.
   */
  constructor(private menuService: MenuService, private ingredientsService: IngredientsService) {}
  /**
   * The list of ingredient names to be displayed in the popup.
   */
  ingredientNames: string[] = [];
  /**
   * The list of menu item types to be displayed in the popup.
   */
  itemTypes: string[] = [];
  /**
   * The list of selected ingredients to be added to the new menu item.
   */
  selectedIngredients: { [key: string]: boolean } = {};
  /**
   * The selected menu item type to be added to the new menu item.
   */
  selectedType: string = '';
  /**
   * OnInit lifecycle hook to fetch menu item types and ingredient names.
   */
  ngOnInit(): void {
    this.menuService.getMenuItemTypes().subscribe((data: any) => {
      this.itemTypes = data.map((item: any) => item.menu_item_type);
    });

    this.ingredientsService.getIngredientNames().subscribe((data: any) => {
      this.ingredientNames = data.map((item: any) => item.ingredient_name);
      data.forEach((ingredient: string) => this.selectedIngredients[ingredient] = false);
    });
  }
  /**
   * Constructs a new item based on the current edit type and emits the new item for addition.
   */

  addItem(): void {
    let newItem = {};

    if (this.editType === 'menu') {
      const ingredientsArray = Object.keys(this.selectedIngredients)
                                     .filter(key => this.selectedIngredients[key]);
      newItem = {
        menu_item_name: this.addedMenuItemName,
        menu_item_price: this.addedMenuItemPrice,
        menu_item_type: this.selectedType,
        ingredients: ingredientsArray,
        image: "https://lh3.googleusercontent.com/pw/ADCreHeFJZfwed7QCBCsg-WGwXr_EsD02eLtWt8Lo7hNM0UMMVj78qZo2j2NVzL9s-laBEx76f1AqGhaU7PpxO2fNVlSqMUHm24gNKWYV-pOZ_TzBpuwYTM",
        description: "Experience the intrigue of our " + this.formatSingleUnderscore(this.addedMenuItemName) + ", a beverage that's still in the experimental stage, awaiting your taste buds' verdict. With each sip, you become part of our culinary exploration, offering feedback and insights as we refine this unique concoction."
      };
    } else if (this.editType === 'inventory') {
      newItem = {
        item_name: this.addedInventoryItemName,
        item_quantity: this.addedInventoryItemQuantity
      };
    } else if (this.editType === 'ingredients') {
      newItem = {
        ingredient_name: this.addedIngredientName,
        ingredient_quantity: this.addedIngredientQuantity
      };
    }
    this.add.emit(newItem);
  }
   /**
   * Emits an event to close the quick add popup.
   */
  closePopup(): void {
    this.cancel.emit();
  }
}
