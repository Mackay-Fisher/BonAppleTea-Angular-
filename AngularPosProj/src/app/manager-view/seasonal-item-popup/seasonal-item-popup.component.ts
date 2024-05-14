import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { IngredientsService } from 'src/app/services/ingredients.service';

/**
 * `SeasonalItemPopupComponent` provides a user interface for adding seasonal menu items.
 * It enables the selection of item types, ingredients, and creation of new menu items.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-seasonal-item-popup',
  templateUrl: './seasonal-item-popup.component.html',
  styleUrls: ['./seasonal-item-popup.component.scss']
})
export class SeasonalItemPopupComponent {
  /**
   * Event emitter for canceling the addition of a seasonal item.
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Event emitter for adding a new seasonal item.
   */
  @Output() add = new EventEmitter<any>();
  /**
   * The name of the new menu item.
   */
  addedMenuItemName: string = '';
  /**
   * The price of the new menu item.
   */
  addedMenuItemPrice: string = '';
  /**
   * The type of the new menu item.
   */
  addedMenuItemType: string = '';
  /**
   * The ingredients of the new menu item.
   */
  addedMenuItemIngredients: string = '';

  /**
   * Array of ingredient names available for selection.
   */
  ingredientNames: string[] = [];

  /**
   * Array of menu item types available for selection.
   */
  itemTypes: string[] = [];

  /**
   * Object to track selected ingredients for the new menu item.
   */
  selectedIngredients: { [key: string]: boolean } = {};

  /**
   * The selected type for the new menu item.
   */
  selectedType: string = '';

  /**
   * Constructor for `SeasonalItemPopupComponent`.
   * @param menuService 
   * @param ingredientsService 
   */
  constructor(private menuService: MenuService, private ingredientsService: IngredientsService) {}

  /**
   * OnInit lifecycle hook to fetch available menu item types and ingredient names.
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

  newIngredient: string = '';

  addNewIngredient(): void {
    let newIng = {};
  
    if (this.newIngredient.trim() && !this.ingredientNames.includes(this.newIngredient.trim())) {
      newIng = {
        ingredient_name: this.newIngredient.trim(),
        ingredient_quantity: 1500
      };
  
      this.ingredientsService.addIngredient(newIng).subscribe({
        next: (response) => {
          this.ingredientNames.push(response.ingredient_name);
          this.selectedIngredients[response.ingredient_name] = true;
          this.newIngredient = '';
        },
        error: (error) => {
          console.error('Error adding ingredient:', error);
        }
      });
    }
  }

  /**
   * Adds a new seasonal item based on the selected parameters.
   */
   addItem(): void {
    let newItem = {};

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

    this.add.emit(newItem);
  }
  /**
   * Emits an event to close the popup without adding an item.
   */
   closePopup(): void {
    this.cancel.emit();
  }
  /**
   * Formats a string with single underscores to a string with spaces and capitalized words.
   * @param ordItem 
   * @returns 
   */
  formatSingleUnderscore(ordItem: string): string {
    let formattedItem = ordItem.replace(/_/g, ' ');
  
    formattedItem = formattedItem.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  
    return formattedItem;
  }
}