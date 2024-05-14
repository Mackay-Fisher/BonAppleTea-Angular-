import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';

/**
 * `WeatherComponent` is responsible for fetching and displaying weather data.
 * It retrieves geographical coordinates based on a location query and then fetches the weather data for that location.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  /**
   * The data to be displayed in the table.
   */
  @Output() weatherLoaded = new EventEmitter<any>();  // Add this line
  /**
   * Constructor for `WeatherComponent`.
   * 
   * @param http HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}
  /**
   * The title of the component.
   */
  title = 'api-weather';
  /**
   * OnInit lifecycle hook to initiate fetching of weather data.
   */
  ngOnInit(): void {
    this.http
      .get<any>(`https://api.openweathermap.org/geo/1.0/direct?q=college%20station&appid=a4a7ae9e4278c9df8a149e4138ab3c0c`)
      .pipe(
        switchMap(data => {
          const lat = data[0].lat;
          const lon = data[0].lon;
          return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a4a7ae9e4278c9df8a149e4138ab3c0c`);
        })
      )
      .subscribe(
        data => {
          this.weatherLoaded.emit(data);  // Emit the data here
        },
        error => {
          console.error(error);
        }
      );
  }
}