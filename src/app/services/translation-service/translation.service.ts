import { Injectable } from '@angular/core';
import { TRANSLATIONS } from '../../data/translations'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [language: string]: { [key: string]: string } } = {};

  private currentLanguage: string = 'es';

  constructor() {
    this.translations = TRANSLATIONS;
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage]?.[key] ?? key;
  }


}
