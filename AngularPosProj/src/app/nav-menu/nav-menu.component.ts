import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataService } from '../components/get-role/get-role.service';
import { MagnifierService } from '../services/Magnifier.service';
import { TextSizeService } from '../services/textsize.service';
import { LensSettingsService } from '../services/lenssize.service';
/**
 * `NavMenuComponent` handles the navigation menu of the application.
 * It includes functionality for search, magnification, and managing user roles based on authentication status.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  /**
   * The search query entered by the user.
   */
  showSearch = false;
  /**
   * The search query entered by the user.
   */
  searchQuery = '';
  /**
   * The search results to be displayed.
   */
  magnifierEnabled = false;
  /**
   * The size of the magnifier lens.
   */
  lensSize = 150; // Size of the magnifier lens
  /**
   * The size of the magnifier lens.
   */
  pageReady = false;

  /**
   * Constructor for `NavMenuComponent`.
   * 
   * @param auth Service for Auth0 authentication.
   * @param dataService Service to check user roles.
   * @param magnifierService Service to manage the magnifier feature.
   */
  constructor(
    public auth: AuthService,
    public dataService: DataService,
    private magnifierService: MagnifierService,
    private textSizeService: TextSizeService,
    private lensSettingsService: LensSettingsService
  ) {}

  /**
   * OnInit lifecycle hook to initialize component properties and subscribe to user data for role management.
   */
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      // User role check and other initialization logic
    });
    setTimeout(() => {
      this.pageReady = true;
    }, 2000); // Delay to ensure page is ready
  }
  increaseSize() {
    this.textSizeService.changeScale(1.1); // Scale up by 10%
  }

  decreaseSize() {
    this.textSizeService.changeScale(0.9); // Scale down by 10%
  }
  /**
   * Toggles the magnifier feature on or off.
   */
  toggleMagnifier(): void {
    this.magnifierService.toggleMagnifier();
  }

  onLensSizeChange(event: any) {
    const size = Number(event.value);
    this.lensSettingsService.setLensSize(size);
  }

  speakMessage() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = "Welcome to BonAppeTea. You can use our speech-to-text feature by clicking on the microphone icon and speaking. Your words will be converted to text.";
    window.speechSynthesis.speak(msg);
  }
  // Additional methods, if any, can be documented here
}
