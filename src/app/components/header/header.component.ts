import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation-service/translation.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = 'Metro Granada';
  currentLanguage: string = 'es';
  isSpanish: boolean = true;

  constructor(private translationService: TranslationService) { }

  toggleLanguage(language: string) {
    this.currentLanguage = language;
    this.isSpanish = language === 'es';

    this.translationService.setLanguage(language);
  }
}