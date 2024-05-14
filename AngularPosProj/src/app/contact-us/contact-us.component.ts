import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
/**
 * `ContactUsComponent` handles the user interactions on the contact us page.
 * It provides functionality for users to send queries or feedback to the application's support or management team.
 *
 * @Component Decorator that marks the class as an Angular component and specifies metadata about the component.
 */
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  /**
   * The name of the customer.
   */
  customername: string = '';
  /**
   * The email of the customer.
   */
  customeremail: string = '';
  /**
   * The feedback of the customer.
   */
  customerfeedback: string = '';
    /**
   * Constructor for `ContactUsComponent`.
   * 
   * @param fb The FormBuilder instance for creating the contact form group.
   * @param contactService The service that handles contact-related operations.
   */
  constructor(
    public auth: AuthService,
    private http: HttpClient
  ) {}
  /**
   * Submits the contact form data to the `ContactService`.
   */
  submitForm() {
    /**
     * The form data to be sent to the backend server.
     */
    const formData = {
      /**
       * The name of the customer.
       */
      customername: this.customername,
      /**
       * The email of the customer.
       */
      customeremail: this.customeremail,
      /**
       * The feedback of the customer.
       */
      customerfeedback: this.customerfeedback
    };
    /**
     * Sends the contact form data to the backend server.
     */
    this.http.post('https://bonappetea.onrender.com/send-email', formData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}
