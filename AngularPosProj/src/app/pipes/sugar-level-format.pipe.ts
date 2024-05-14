import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sugarLevelFormat'
})
export class SugarLevelFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'noSugar') return 'None';
    if (value === 'Honey') return 'Honey';
    else return value + '%';
  }

}
