import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MenuService } from 'src/app/services/menu.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { InventoryService } from 'src/app/services/inventory.service';
/**
 * `EditItemPopupComponent` provides a popup modal interface for editing items in the menu, inventory, or ingredients.
 * The component supports different edit types and handles the saving and closing of the edit interface.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-edit-item-popup',
  templateUrl: './edit-item-popup.component.html',
  styleUrls: ['./edit-item-popup.component.scss']
})
export class EditItemPopupComponent implements OnInit, OnChanges {
  /**
   * The item to be edited, passed from the parent component.
   */
  @Input() item: any;
    /**
   * Specifies the type of edit being performed ('menu', 'inventory', 'ingredients').
   */
  @Input() editType: 'menu' | 'inventory' | 'ingredients' | null = null;
    /**
   * Event emitter to notify the parent component to save the edited item.
   */
  @Output() save = new EventEmitter<any>();
    /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  @Output() close = new EventEmitter<void>();
/**
 * Event emitter to notify the parent component to close the edit popup.
 */
  editedMenuItemName: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  editedMenuItemPrice: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  editedMenuItemType: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  ingredientsInput: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */

  editedInventoryItemName: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  editedInventoryItemQuantity: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */

  editedIngredientName: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  editedIngredientQuantity: string = '';
  /**
   * Event emitter to notify the parent component to close the edit popup.
   */
  thing: any;

  ingredientNames: string[] = [];
  selectedIngredients: { [key: string]: boolean } = {};
  itemTypes: string[] = [];
  selectedType: string = '';
  /**
   * Constructor for `EditItemPopupComponent`.
   * 
   * @param menuService The service for handling menu item operations.
   * @param ingredientsService The service for handling ingredient operations.
   * @param inventoryService The service for handling inventory item operations.
   */
  constructor(private menuService: MenuService, private ingredientsService: IngredientsService, private inventoryService: InventoryService) {}
  /**
   * OnInit lifecycle hook to initialize the component.
   */
  ngOnInit(): void {
    this.initializeEditFields();
    this.loadIngredients();
    this.loadItemTypes();
  }

    /**
   * OnChanges lifecycle hook to respond to input changes.
   * 
   * @param changes Object containing the changes made to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['thing']) {
      this.initializeEditFields();
    }
  }

  private loadItemTypes(): void {
    this.menuService.getMenuItemTypes().subscribe((data: any) => {
      this.itemTypes = data.map((item: any) => item.menu_item_type);
      this.setSelectedType();
    });
  }

  private setSelectedType(): void {
    if (this.editType === 'menu' && this.thing) {
      this.selectedType = this.thing.menu_item_type;
    }
  }

  private loadIngredients(): void {
    this.ingredientsService.getIngredientNames().subscribe((data: any) => {
      this.ingredientNames = data.map((item: any) => item.ingredient_name);
      this.ingredientNames.forEach(ingredient => this.selectedIngredients[ingredient] = false);
      this.updateSelectedIngredients();
    });
  }

  private updateSelectedIngredients(): void {
    if (this.editType === 'menu' && this.thing && this.thing.ingredients) {
      this.thing.ingredients.forEach((ingredient: string) => {
        if (this.ingredientNames.includes(ingredient)) {
          this.selectedIngredients[ingredient] = true;
        }
      });
    }
  }

  /**
   * Initializes the edit fields based on the `editType` and the item provided.
   */
  private initializeEditFields(): void {
    if (this.editType === 'menu') {
      this.menuService.getMenuItemById(this.item.menu_item_id).subscribe((data: any) => {
        this.thing = data;
        this.editedMenuItemName = this.thing.menu_item_name;
        this.editedMenuItemPrice = this.thing.menu_item_price;
        this.editedMenuItemType = this.thing.menu_item_type;
        this.ingredientsInput = Array.isArray(this.thing.ingredients)
          ? this.thing.ingredients.join(',')
          : this.thing.ingredients;
      });
    } else if (this.editType === 'inventory') {
      this.inventoryService.getItemById(this.item.item_id).subscribe((data: any) => {
        this.thing = data;
        this.editedInventoryItemName = this.thing.item_name;
        this.editedInventoryItemQuantity = this.thing.item_quantity;
      });
    } else if (this.editType === 'ingredients') {
      this.ingredientsService.getIngredientById(this.item.ingredient_id).subscribe((data: any) => {
        this.thing = data;
        this.editedIngredientName = this.thing.ingredient_name;
        this.editedIngredientQuantity = this.thing.ingredient_quantity;
      });
    }
    this.updateSelectedIngredients();
    this.setSelectedType();
  }
  /**
   * Saves the edits made to the item and emits the updated item to the parent component.
   */
  saveEdit(): void {
    if (this.editType === 'menu') {
      this.item.menu_item_name = this.editedMenuItemName;
      this.item.menu_item_price = this.editedMenuItemPrice;
      this.item.menu_item_type = this.selectedType;
      this.item.ingredients = Object.keys(this.selectedIngredients)
                                    .filter(key => this.selectedIngredients[key]);
    } else if (this.editType === 'inventory') {
      this.item.item_name = this.editedInventoryItemName;
      this.item.item_quantity = this.editedInventoryItemQuantity;
    } else if (this.editType === 'ingredients') {
      this.item.ingredient_name = this.editedIngredientName;
      this.item.ingredient_quantity = this.editedIngredientQuantity;
    }
    this.save.emit(this.item);
  }
  /**
   * Emits an event to close the edit popup.
   */
  closePopup(): void {
    this.close.emit();
  }
}
