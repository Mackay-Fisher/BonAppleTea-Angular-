import { Component,ElementRef, Renderer2,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ActiveComponentService } from './services/currentcomp.service';
import { MagnifierService } from './services/Magnifier.service';
import { TextSizeService } from './services/textsize.service';
import {LensSettingsService} from './services/lenssize.service';
import html2canvas from 'html2canvas';
/**
 * Root component of the Angular application.
 * Manages the main view and interacts with services to control specific features like magnification.
 *
 * @Component Decorator that marks a class as an Angular component and provides configuration metadata
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Component properties
  /**
   * Whether to apply the container class to the main view.
   */
  applyContainerClass = true;
  /**
   * Whether the magnifier feature is enabled.
   */
  magnifierEnabled = false;
  /**
   * The size of the magnifier lens.
   */
  canvasImage: string | null = null;
  /**
   * The size of the magnifier lens.
   */
  pageReady = false;
  /**
   * The size of the magnifier lens.
   */
  originalIframeSrc: string | null = null;
  /**
   * The size of the magnifier lens. 
   * */ 
  lastMouseX = 0;
  /**
   * The size of the magnifier lens.
   */
  lastMouseY=0;
  /**
   * The size of the magnifier lens.
   */
  canvaswidth = 0;
  /**
   * The size of the magnifier lens.
   */
  canvasheight=0;
  /**
   * The size of the magnifier lens.
   */
  lensSize:number=150;
  // Private subscriptions to manage observable subscriptions
  private magnifierSub: Subscription | undefined;
  private routerSub: Subscription | undefined;
  private currentScale = 1.0;

    /**
   * Constructor of the AppComponent.
   * Initializes services and sets up subscription to activeComponentService.
   *
   * @param activeComponentService Service to get the active component in the application.
   * @param magnifierService Service to control the magnifier feature.
   * @param router Angular Router for managing navigation.
   */
  constructor(private activeComponentService: ActiveComponentService, private magnifierService: MagnifierService, private router: Router, private el: ElementRef, 
    private renderer: Renderer2,
    private textSizeService: TextSizeService,private lensSettingsService: LensSettingsService) {
    this.activeComponentService.activeComponent.subscribe(componentName => {
      // Adjust the logic based on your component names
      this.applyContainerClass = componentName !== 'MenuItemComponent';
    });
  }
    /**
   * Angular's ngOnInit lifecycle hook.
   * Sets up subscriptions and event handlers for the component.
   */
  ngOnInit() {
    this.magnifierSub = this.magnifierService.getMagnifierState().subscribe(
      (state: boolean) => {
        this.magnifierService.togglestartScreenflip();
        this.captureCanvasWithCorsHandling();
        setTimeout(() => {
        this.magnifierEnabled = state.valueOf();}, 1000);
        console.log(this.magnifierEnabled); // Log inside the subscription
      }
    );
    this.lensSettingsService.lensSize$.subscribe(size => {
      this.lensSize = size;
      this.getLensStyle();
      // Implement logic to adjust lens size
    });
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Wait for a short time to allow the new page to render
      if(this.magnifierEnabled){
        this.toggleMagnifier()
      }
      // setTimeout(() => {
      //   this.captureCanvasWithCorsHandling();
      // }, 1000); // Adjust the delay as needed
    });
    this.textSizeService.scale$.subscribe(scale => {
      this.adjustTextSize(scale);
    });
  }
  adjustTextSize(scale: number) {
    this.currentScale *= scale;
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((element: Element) => {
      const currentSize = window.getComputedStyle(element).fontSize;
      const newSize = parseFloat(currentSize) * this.currentScale;
      this.renderer.setStyle(element, 'font-size', `${newSize}px`);
    });
  }
   /**
   * Updates the content of the magnifying lens when the page is scrolled.
   */
  updateLensContentOnScroll(): void {
    const lens = document.getElementById('magnifierLens') as HTMLElement;
    if (!lens || !this.canvasImage) return;
  
    const magnificationFactor = 1.5; // Adjust as needed
    const lensSize = this.lensSize; // The size of your lens
  
    // Calculate the correct background position considering the scroll
    this.lastMouseX = (this.lastMouseX - window.scrollX)
    this.lastMouseY = (this.lastMouseY + window.scrollY)
    const backgroundPosX = this.lastMouseX * magnificationFactor - lensSize / 2;
    const backgroundPosY = this.lastMouseY * magnificationFactor - lensSize / 2;
  
    lens.style.background = `url(${this.canvasImage})`;
    lens.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
  }
  
    /**
   * Handles mouse movement events.
   * Updates the magnifying lens position based on the mouse position.
   *
   * @param e MouseEvent object
   */
  handleMouseMove(e: MouseEvent) {
    this.lastMouseX = e.clientX + window.scrollX;
    this.lastMouseY = e.clientY + window.scrollY;
    this.updateLens();
  }
  /**
   * Handles scroll events to update the lens position.
   */
  handleScroll() {
    // Call the updateLens method to adjust the position during scrolling
    this.updateLens();
  }
  /**
   * Updates the lens position and content based on current mouse position.
   */

  updateLens() {
    const lens = document.getElementById('magnifierLens') as HTMLElement;
    const magnificationFactor = 1.5;
    const lensSize = this.lensSize;;
  
    if (lens && this.canvasImage) {
      // Adjust position
      lens.style.left = `${this.lastMouseX - lensSize / 2}px`;
      lens.style.top = `${this.lastMouseY - lensSize / 2}px`;
  
      // Adjust background
      const backgroundPosX = this.lastMouseX * magnificationFactor - lensSize / 2;
      const backgroundPosY = this.lastMouseY * magnificationFactor - lensSize / 2;
      lens.style.background = `url(${this.canvasImage}) no-repeat`;
      lens.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
    }
  }
  /**
   * Updates the position of the magnifying lens based on the mouse event.
   *
   * @param e MouseEvent object
   */
  updateLensPosition(e:MouseEvent): void {
    const lens = document.getElementById('magnifierLens') as HTMLElement;
    if (!lens || !this.magnifierEnabled) return;
    const lensSize = this.lensSize; // The size of your lens, adjust as needed
  
    // Position the lens around the cursor
    lens.style.left = `${e.clientX- lensSize / 2}px`;
    lens.style.top = `${e.clientY - lensSize / 2}px`;
  }
  /**
   * Updates the content of the magnifying lens based on the mouse event.
   *
   * @param e MouseEvent object
   */
  updateLensContent(e:MouseEvent): void {
    const lens = document.getElementById('magnifierLens') as HTMLElement;
    if (!lens || !this.canvasImage) return;
  
    const magnificationFactor = 1.5; // Adjust as needed
    const lensSize = this.lensSize; // The size of your lens
  
    // Calculate the correct background position
    const backgroundPosX = (e.clientX - window.scrollX) * magnificationFactor - lensSize /2;
    const backgroundPosY = (e.clientY - window.scrollY) * magnificationFactor - lensSize/2;
    lens.style.background = `url(${this.canvasImage})`;
    // lens.style.backgroundSize = `${window.innerWidth * magnificationFactor}px ${window.innerHeight * magnificationFactor}px`;
    lens.style.backgroundPosition = `-${backgroundPosX}px -${backgroundPosY}px`;
  }
    /**
   * Angular's ngOnDestroy lifecycle hook.
   * Cleans up subscriptions and event listeners when the component is destroyed.
   */

  ngOnDestroy() {
    if (this.magnifierSub) {
      this.magnifierSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    // Remove the event listener to prevent memory leaks
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  getLensStyle() {
    return {
      'width': this.lensSize + 'px',
      'height': this.lensSize + 'px',
      // Include other necessary CSS properties for the lens
    };
  }
  /**
   * Angular's ngAfterViewInit lifecycle hook.
   * Performs additional initialization tasks after the view is initially rendered.
   */
  ngAfterViewInit() {
    this.getLensStyle();
    this.captureCanvasWithCorsHandling(); // Initial capture
    // Set up router event subscription here as well
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  /**
   * Captures the current state of the application's view into a canvas.
   * Handles CORS related issues during the capture process.
   */
  captureCanvasWithCorsHandling() {
    const templateDiv = document.getElementById('template') as HTMLDivElement;
    const googleMapsIframe = document.getElementById('google-map-iframe') as HTMLIFrameElement;
  
    // Display the template div and hide the iframe
    if (templateDiv && googleMapsIframe) {
      templateDiv.style.display = 'block';
      googleMapsIframe.style.display = 'none';
    }
    
    /**
     * creates a timeout to help showcase the background image capture of the page
     */
    setTimeout(() => {
      console.log('Scroll Height:', document.body.scrollHeight);
      console.log('Scroll Width:', document.body.scrollWidth);
      html2canvas(document.body, {
        proxy: "https://bonappetea.onrender.com/proxy",
        scale: 1.5,
        useCORS: true,  
        windowHeight: document.body.scrollHeight,
        windowWidth: document.body.scrollWidth
      }).then(canvas => {
        // Convert the canvas to a data URL and store it
        this.canvasImage = canvas.toDataURL('image/png');
        console.log('Canvas Height:', canvas.height);
        console.log('Canvas Width:', canvas.width);
      }).catch(error => {
        console.error('Error capturing canvas:', error);
      });
    }, 1000); // Adjust delay as necessary
  }
    /**
   * Toggles the state of the magnifier feature.
   */
  toggleMagnifier(): void {
    this.magnifierService.toggleMagnifier();
  }
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    // ... configure utterance as needed
    window.speechSynthesis.speak(utterance);
  }
}
