import { Component, Input } from '@angular/core';
import { TranslationService } from '../../services/translation-service/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isMobileView: boolean = false;

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