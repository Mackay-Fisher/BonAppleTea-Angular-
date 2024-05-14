/**
 * This is the interface for customers with customer_id, first_name, last_name, phone_number
 */
export class Customers {
    /**
     * The id of the customer.
     */
    customer_id?: number;
    /**
     * The first name of the customer.
     */
    first_name?: string;
    /**
     * The last name of the customer.
     */
    last_name?: string;
    /**
     * The phone number of the customer.
     */
    phone_number?: string;
}
