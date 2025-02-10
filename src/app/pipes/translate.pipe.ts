import { Pipe, type PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation-service/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(value: string): string {
    return this.translationService.translate(value);
  }

}
