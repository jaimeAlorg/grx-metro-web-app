import { Component, Input, type OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation-service/translation.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() isMobileView: boolean = false;
  @Input() currentLanguage: string = '';

  title: string = 'Metro Granada';
  isSpanish: boolean = true;

  constructor(private translationService: TranslationService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.translationService.setLanguage(this.currentLanguage);
    this.isSpanish = this.currentLanguage === 'es';
  }

  toggleLanguage(language: string) {
    this.currentLanguage = language;
    this.isSpanish = language === 'es';

    this.localStorageService.saveLanguage(language);
    this.translationService.setLanguage(language);

  }

}