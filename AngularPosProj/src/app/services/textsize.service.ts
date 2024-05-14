// text-size.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextSizeService {
  private scale = new BehaviorSubject<number>(1.0); // Default scale factor

  scale$ = this.scale.asObservable();

  changeScale(newScale: number) {
    this.scale.next(newScale);
  }
}
