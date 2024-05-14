// menu-item.model.ts
/**
 * This is the model for the menu item.
 */
export interface MenuItem {
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
 * This is the model for the customer menu item.
 */
export interface CustomerMenuItem {
    /**
     * The id of the menu item.
     */
    id: number;
    /**
     * The name of the menu item.
     */
    name: string;
    /**
     * The type of the menu item.
     */
    image: string;
    /**
     * The price of the menu item.
     */
    price: number;
    /**
     * The ingredients of the menu item.
     */
    ingredients: string;
}




