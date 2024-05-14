// lens-settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LensSettingsService {
  private lensSize = new BehaviorSubject<number>(100); // Default lens size
  private magnification = new BehaviorSubject<number>(2); // Default magnification

  lensSize$ = this.lensSize.asObservable();
  magnification$ = this.magnification.asObservable();

  setLensSize(size: number) {
    this.lensSize.next(size);
  }

  setMagnification(mag: number) {
    this.magnification.next(mag);
  }
}
