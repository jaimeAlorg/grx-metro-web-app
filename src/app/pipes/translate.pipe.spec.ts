import { TranslatePipe } from './translate.pipe';
import { TranslationService } from '../services/translation-service/translation.service';

describe('TranslatePipe', () => {
  let mockTranslationService: jasmine.SpyObj<TranslationService>;
  let pipe: TranslatePipe;

  beforeEach(() => {
    mockTranslationService = jasmine.createSpyObj<TranslationService>('TranslationService', ['translate']);
    pipe = new TranslatePipe(mockTranslationService);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should translate a value using TranslationService', () => {
    mockTranslationService.translate.and.returnValue('Hola');

    const result = pipe.transform('Hello');

    expect(result).toBe('Hola');
    expect(mockTranslationService.translate).toHaveBeenCalledWith('Hello');
  });
});
