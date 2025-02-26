import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslationService } from '../../services/translation-service/translation.service';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['setLanguage']);
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['saveLanguage']);

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockTranslationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    mockLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  beforeEach(() => {
    mockTranslationService.setLanguage.calls.reset();
    mockLocalStorageService.saveLanguage.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct language to spanish', () => {
    component.currentLanguage = 'es';
    component.ngOnInit();
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('es');
    expect(component.isSpanish).toBeTrue();
  });

  it('should initialize with the correct language to english', () => {
    component.currentLanguage = 'en';
    component.ngOnInit();
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('en');
    expect(component.isSpanish).toBeFalse();
  });

  it('should toggle language correctly to English', () => {
    component.toggleLanguage('en');
    expect(component.isSpanish).toBeFalse();
    expect(component.currentLanguage).toBe('en');
    expect(mockLocalStorageService.saveLanguage).toHaveBeenCalledWith('en');
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('en');
  });

  it('should toggle language correctly to Spanish', () => {
    component.toggleLanguage('es');
    expect(component.isSpanish).toBeTrue();
    expect(component.currentLanguage).toBe('es');
    expect(mockLocalStorageService.saveLanguage).toHaveBeenCalledWith('es');
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('es');
  });
});
