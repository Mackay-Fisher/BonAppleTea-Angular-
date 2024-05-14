import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { ActiveComponentService } from '../services/currentcomp.service';
import { CartService } from '../cart-modal/cart-modal.service';
import { FormatCamelCasePipe } from '../pipes/format-camel-case.pipe';
import { Location } from '@angular/common';
import { async } from '@firebase/util';
import { FormBuilder, FormGroup } from '@angular/forms';



/**
 * `MenuItemComponent` displays detailed information about a specific menu item.
 * It handles operations like selecting toppings, adding items to cart, and navigating back to the previous view.
 *
 * @Component Decorator that marks the class as an Angular component and provides metadata about the component.
 */
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  providers: [FormatCamelCasePipe]
})

export class MenuItemComponent implements OnInit {
  /**
   * The menu item to be displayed.
   */
  menuItems: MenuItem[] = [];
  /**
   * The toppings to be displayed.
   */
  ToppingItems: MenuItem[] = [];
  /**
   * The selected toppings.
   */
  selectedToppings: Set<number> = new Set();
  currentItem: MenuItem | null = null;
  itemIndex: number = -1;

  formSugar!: FormGroup;
  formIce!: FormGroup;

  cursugar = "";
  curice  ="";
  curdescription = "";

  isEditing: boolean = false;
  /**
   * The constructor for the `MenuItemComponent`.
   * @param activeComponentService 
   * @param route 
   * @param menuService 
   * @param cartService 
   * @param camelCase 
   * @param location 
   */
  constructor(
    private activeComponentService: ActiveComponentService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService,
    private camelCase: FormatCamelCasePipe,
    private location: Location,
    private fb: FormBuilder
  ) { }

  sugar = [
    { label: 'No Sugar', value: 'noSugar' },
    { label: '25%', value: '25' },
    { label: '50%', value: '50' },
    { label: '75%', value: '75' },
    { label: '100%', value: '100' },
    { label: '125%', value: '125' },
    { label: '150%', value: '150' },
    { label: '175%', value: '175' },
    { label: '200%', value: '200' },
    { label: 'Honey', value: 'honey' }
  ];

  ice = [
    { label: 'No Ice', value: 'noIce' },
    { label: 'Less Ice', value: 'lessIce' },
    { label: 'Normal Ice', value: 'normalIce' },
  ];

  /**
   * OnInit lifecycle hook to perform initial data loading and setup.
   */
  ngOnInit() {
    this.menuService.getMenuByType('toppings').subscribe(data => {
      this.ToppingItems = data;
    }
    );
    this.activeComponentService.setActiveComponent('MenuItemComponent');
    this.route.paramMap.subscribe(params => {
      let type = params.get('type');
      let name = params.get('name');
      console.log(name, type);
      let tempIndex = params.get('index');
      console.log(tempIndex);
      if (tempIndex != null) {
        this.itemIndex = +tempIndex;
        console.log(tempIndex, this.itemIndex);
      }

      if (this.itemIndex >= 0) {
        this.isEditing = true;
      }

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

      if (name && type) {
        this.menuService.getMenuItemByName(name, type).subscribe(data => {
          this.menuItems = data;

          let tempItem = this.cartService.getItem(this.itemIndex);
          if (tempItem) {
            this.currentItem = {
              ...tempItem,
              sugar_level: tempItem.sugar_level ? tempItem.sugar_level : "",
              ice_level: tempItem.ice_level ? tempItem.ice_level : "",
              additional_info: tempItem.additional_info ? tempItem.additional_info : "",
            }
            this.formSugar.get('sugar.selectedLevel')?.setValue(this.currentItem?.sugar_level);
            this.formIce.get('ice.selectedLevel')?.setValue(this.currentItem?.ice_level);
          }
          if (this.isEditing) {
            setTimeout(() => {
            console.log(this.currentItem);
            if(this.currentItem){
              this.cursugar= this.currentItem.sugar_level;
              this.curice= this.currentItem.ice_level;
              this.curdescription= this.currentItem.additional_info;
              this.selectedToppings = new Set(this.currentItem.added_toppings.map(top => this.getToppingByName(top).menu_item_id));
            }
            console.log(this.selectedToppings);
            }, 500);
            // this.selectedToppings = new Set(this.currentItem.added_toppings);
            // for (let i = 0; i < this.currentItem.added_toppings.length; i++) {
            //   this.toppingAdd(this.menuItems[0], this.getToppingByName(this.currentItem.added_toppings[i]));
            //   // this.selectedToppings.add(this.getToppingByName(this.currentItem.added_toppings[i]).menu_item_id);
            // }
          }
        });
      }
    });



  }

  getToppingById(toppingId: number) : MenuItem {
    return this.ToppingItems.find(topping => topping.menu_item_id === toppingId)!;
  }

  getToppingByName(toppingName: string) : MenuItem {
    return this.ToppingItems.find(topping => topping.menu_item_name === toppingName)!;
  }

  isToppingSelected(toppingName: string): boolean {
    return this.currentItem?.added_toppings?.includes(toppingName) || false;
  }

  onToppingCheckboxChange(event: Event, toppingId: number, item: MenuItem) {
    const checkbox = event.target as HTMLInputElement;
    this.onToppingChange(toppingId, checkbox.checked,item);
  }
  
  onSugarCheckboxChange(event: Event, level: string,item: MenuItem) {
    const radio = event.target as HTMLInputElement;
    this.onSugarChange(level, radio.checked, item);
  }
  
  onSugarChange(sugarLevel: string, isChecked: boolean, item: MenuItem) {
    if (isChecked) {
      item.sugar_level = sugarLevel;
      this.cursugar=sugarLevel;
    }
    console.log("Sugar level changed to:", item.sugar_level);
    console.log(item);
  }
  
  onIceCheckboxChange(event: Event, level: string,item: MenuItem) {
    const radio = event.target as HTMLInputElement;
    this.onIceChange(level, radio.checked, item);
  }
  
  onIceChange(iceLevel: string, isChecked: boolean, item: MenuItem) {
    if (isChecked) {
      item.ice_level = iceLevel;
      this.curice=iceLevel;
    }
    console.log("Ice level changed to:", item.ice_level);
    console.log(item);
  }

  isSugarSelected(sugarLevel: string): boolean {
    return this.currentItem?.sugar_level === sugarLevel;
  }

  isIceSelected(iceLevel: string): boolean {
    return this.currentItem?.ice_level === iceLevel;
  }

  isadditionalSelected():string|undefined {
    return this.currentItem?.additional_info;
  }

  // Handle additional information input change
  onAdditionalInfoChange(event: Event, item: MenuItem) {
    const textbox = event.target as HTMLInputElement;
    this.onAdditionalChange(textbox.value, item);
  }

  // Update the additional information in the item
  onAdditionalChange(additionalInfo: string, item: MenuItem) {
    item.additional_info = additionalInfo;
    this.curdescription=additionalInfo;
    console.log("Additional info changed to:", item.additional_info);
    console.log(item);
  }


  /**
   * Adds or removes a topping based on its selection state.
   *
   * @param toppingId The ID of the topping.
   * @param isChecked Boolean indicating whether the topping is selected.
   */
  onToppingChange(toppingId: number, isChecked: boolean, item: MenuItem) {
    if (isChecked) {
      this.selectedToppings.add(toppingId);
      this.editprice(item,true,toppingId);
    } else {
      this.selectedToppings.delete(toppingId);
      this.editprice(item,false,toppingId);
    }
    console.log(this.selectedToppings)
  }
  editprice(item: MenuItem,add:boolean,toppingId:number){
    if(this.currentItem){
      const price = parseFloat(this.currentItem.menu_item_price);
      const topping = this.getToppingById(toppingId);
      if(add){
        item.menu_item_price = (price + parseFloat(topping.menu_item_price)).toFixed(2);
        this.currentItem.menu_item_price = (price + parseFloat(topping.menu_item_price)).toFixed(2);
      }else{
        item.menu_item_price = (price - parseFloat(topping.menu_item_price)).toFixed(2);
        this.currentItem.menu_item_price = (price - parseFloat(topping.menu_item_price)).toFixed(2);
      }
    }else{
      const price = parseFloat(item.menu_item_price);
      const topping = this.getToppingById(toppingId);
      if(add){
        item.menu_item_price = (price + parseFloat(topping.menu_item_price)).toFixed(2);
      }else{
        item.menu_item_price = (price - parseFloat(topping.menu_item_price)).toFixed(2);
      }
    }
  /**
   * Adds a menu item to the cart.
   *
   * @param item The menu item being added.
   */

  }
  onAdd(item: MenuItem) {
    item.added_toppings = Array.from(this.selectedToppings).map(toppingId => this.getToppingById(toppingId).menu_item_name);
    console.log(item);
    this.cartService.addItem(item);
    // Update the local menuItems array (optional, if you want to display the added item immediately)
    // this.menuItems = this.cartService.getCartItems();
  }
  /**
   * Adds a topping to a menu item and updates its price.
   *
   * @param item The menu item to which the topping is being added.
   * @param topping The topping being added.
   */

  onUpdate(item:MenuItem) {
    item.additional_info = this.curdescription;
    item.sugar_level = this.cursugar;
    item.ice_level = this.curice;
    item.added_toppings = Array.from(this.selectedToppings).map(toppingId => this.getToppingById(toppingId).menu_item_name);
    //@ts-ignore
    this.cartService.updateItem(this.itemIndex, item);
  }
  /**
   * Removes a topping from a menu item and updates its price.
   */
  onCancel() {
    this.cartService.clearCart();
  }
  /**
   * Clears the cart.
   */
  onOrderCompleted() {
    this.cartService.clearCart();
  }
  //(change)="onToppingChange(topping.menu_item_id $event.target.checked)"
  /**
   * Navigates back to the previous view.
   */
  goBack(): void {
    this.location.back();
  }

}
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