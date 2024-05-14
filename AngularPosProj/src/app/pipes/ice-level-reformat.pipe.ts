import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iceLevelReformat'
})
export class IceLevelReformatPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'noIce') { return 'No Ice' };
    if (value == 'lessIce') {return 'Less Ice'};
    return 'Normal Ice';
  }

}
