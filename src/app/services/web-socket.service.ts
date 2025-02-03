import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  websocketUrl = environment.websocketUrl;

  constructor() {
    this.socket$ = webSocket(this.websocketUrl);
  }

  sendMessage(message: string) {
    this.socket$.next(message);
  }

  getMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}
