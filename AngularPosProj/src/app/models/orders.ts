/**
 * Defines the structure of an order, including details such as timestamp, ID, items, total, and IDs of the employee and customer.
 */
 export class Orders {
    /**
     * The timestamp of the order.
     */
    order_timestamp?: Date;
    /**
     * The id of the order.
     */
    order_id?: number;
    /**
     * The items in the order.
     */
    order_items?: string[];
    /**
     * The total amount of the order.
     */
    order_total?: number;
    /**
     * The id of the employee who took the order.
     */
    employee_id?: number;
    /**
     * The id of the customer who placed the order.
     */
    customer_id?: number;
}