/**
 * Describes a menu item with properties such as ID, name, type, price, ingredients, image, and description.
 */
 export class Menu {
    /**
     * The id of the menu item.
     */
    menu_item_id?: number;
    /**
     * The name of the menu item.
     */
    menu_item_name?: string;
    /**
     * The type of the menu item.
     */
    menu_item_type?: string;
    /**
     * The price of the menu item.
     */
    menu_item_price?: number;
    /**
     * The ingredients of the menu item.
     */
    ingredients?: string[];
    /**
     * The image of the menu item.
     */
    image?: string;
    /**
     * The toppings of the menu item.
     */
    description?: string;
}