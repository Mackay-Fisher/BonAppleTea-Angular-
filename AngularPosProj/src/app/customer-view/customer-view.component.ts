import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MagnifierService } from '../services/Magnifier.service';

/**
 * `CustomerViewComponent` is responsible for displaying weather-related information and managing the magnifier feature for customers.
 * It includes functionality to display different weather conditions and interact with the magnifier service.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  /**
   * The weather data to be displayed.
   */
  weatherData: any;
  /**
   * The current weather condition.
   */
  magnifierEnabled = false;
  /**
   * The subscription to the magnifier service.
   */
  private magnifierSub: Subscription | undefined;
  /**
   *  The URL to the image to be displayed.
   */
  rainyImageUrl: string = 'https://i.ibb.co/DCQH1cN/download.jpg'; // URL to the rainy image
  /**
   * The URL to the image to be displayed.
   */
  cloudyImageUrl: string = 'https://i.ibb.co/0FchgTR/360-F-267839295-j-Vbzp-Vskp-Rpn-Paq3x-LFjj-X9g-Yj-NRocx-N.jpg'; // URL to the cloudy image
  /**
   * The URL to the image to be displayed.
   */
  sunnyImageUrl: string = 'https://i.ibb.co/c8QSfJZ/360-F-114186982-28d-EWbci-TYahk-AI0zne-K0-OEvd-HDAAaw2.jpg'; // URL to the sunny image

  /**
   * OnInit lifecycle hook to subscribe to the magnifier service state.
   */
  ngOnInit(): void {
    this.magnifierSub = this.magnifierService.getMagnifierState().subscribe(
      (state: boolean) => {
        this.magnifierEnabled = state.valueOf();
        console.log(this.magnifierEnabled); // Log the state inside the subscription
      }
    );
  }
  snowy ="https://i.ibb.co/C5fB6Pw/snowy-1163635.png"
  storm="https://i.ibb.co/zHr8Pbg/storm-1163631.png"
  light_rain="https://i.ibb.co/f9T6nhJ/cloudy-1163657.png"
  cloudy="https://i.ibb.co/SnBRvY1/cloud-1163624.png"
  spaced_clouds="https://i.ibb.co/mqYjq8j/cloudy-1163634.png"
  sunny="https://i.ibb.co/kc5TKRQ/sun-1163662.png"
  sunny_cloudy="https://i.ibb.co/N2f09xf/cloudy-1163661.png"
  geticonImage(condition:string){
    if(condition==='clear sky'){
      return this.sunny
    }
    if(condition=='few clouds'){
      return this.sunny_cloudy
    }
    if(condition=='scattered clouds'){
      return this.cloudy
    }
    if(condition=='broken clouds'){
      return this.spaced_clouds
    }
    if(condition=='shower rain'){
      return this.light_rain
    }
    if(condition=='rain'){
      return this.light_rain
    }
    if(condition=='thunderstorm'){
      return this.storm
    }
    if(condition=='snow'){
      return this.snowy
    }
    if(condition=='mist'){
      return this.cloudy
    } else{
      return this.sunny
    }
  }
  /**
   * Determines the appropriate weather image URL based on humidity.
   *
   * @param humidity The humidity percentage to determine the weather image.
   * @returns The URL of the corresponding weather image.
   */
  getWeatherImage(humidity: number): string {
    if (humidity >= 60) {
      return this.rainyImageUrl;
    } else if (humidity >= 30) {
      return this.cloudyImageUrl;
    } else {
      return this.sunnyImageUrl;
    }
  }

  /**
   * Handles the loaded weather data and assigns it to the weatherData property.
   *
   * @param data The weather data object received.
   */
  handleWeatherLoaded(data: any): void {
    this.weatherData = data;  // Assign the data to the property
    console.log(this.weatherData.main); // Log the data
  }

  /**
   * Converts a temperature from Kelvin to Fahrenheit.
   *
   * @param kelvinTemp The temperature in Kelvin.
   * @returns The temperature converted to Fahrenheit.
   */
  convertToFahrenheit(kelvinTemp: number): string {
    return ((kelvinTemp - 273.15) * 9 / 5 + 32).toFixed(2);
  }
  
  /**
   * Gets the full URL for a weather icon based on its code.
   *
   * @param iconCode The icon code from the weather data.
   * @returns The full URL to the weather icon.
   */
  getWeatherIcon(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}.png`; // URL for weather icons
  }

  constructor(private magnifierService: MagnifierService){}

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    // ... configure utterance as needed
    window.speechSynthesis.speak(utterance);
  }
  
}
