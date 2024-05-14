/**
 * Contains details about an order's history, including timestamp, ID, items, total amount, and IDs of employee and customer.
 */
 export class OrderHistory {
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