import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveLanguage(language: string): void {
    localStorage.setItem('language', language);
  }

  saveLastSeenStation(stationName: string): void {
    localStorage.setItem('lastSeenStation', stationName);
  }

  getLanguage(): string | null {
    return localStorage.getItem('language');
  }

  getLastSeenStation(): string | null {
    return localStorage.getItem('lastSeenStation');
  }
}
