import { Injectable } from "@angular/core";
import { type Observable, timer, retry } from "rxjs";
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  reconnectionInterval = 5000;
  websocketUrl = environment.websocketUrl;

  constructor() {
    this.socket$ = webSocket(this.websocketUrl);

    this.socket$
      .pipe(
        retry({
          delay: (error, retryCount) => {
            console.error(
              `Error in connection, retrying attempt #${retryCount}...`,
              error
            );
            return timer(this.reconnectionInterval);
          },
        })
      )
      .subscribe(
        (message) => console.log("Received message:", message),
        (error) => console.error(error),
        () => this.closeConnection()
      );
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
