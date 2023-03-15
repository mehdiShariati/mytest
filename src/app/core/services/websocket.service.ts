import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
// @ts-ignore
import { Websocket } from 'faye-websocket';
const CHAT_URL = `ws://172.31.112.51:8081/api/chat/ws`;

export type WebSocketHeaders = {
  Authorization: string;
  'Custom-Header': string;
};
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent> | undefined;
  public messages: Subject<any>;

  constructor() {
    this.messages = <Subject<any>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): any => {
        console.log(response);
        return JSON.parse(response.data);
      }),
    );
  }

  public connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    // @ts-ignore
    let token: string = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    // @ts-ignore
    document.cookie = 'Authorization=Bearer ' + token + '; path=/';
    const authHeader = 'Bearer ' + token; //Replace your-jwt-token with your actual access token or authorization token

    const data = {
      'Request URL': 'http://172.31.112.51:8081/api/chat/ws',
      'Request Method': 'GET',
      'Request Headers': {
        Authorization: authHeader,
        'Sec-WebSocket-Version': '13',
        Connection: 'Upgrade',
        Upgrade: 'websocket',
        'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
        Host: '172.31.112.51:8081',
      },
    };

    const ws = new WebSocket(url);
    const Ws = Websocket.Client();
    ws.send(JSON.stringify(data));
    ws.addEventListener('error', event => {
      console.log('inji');
      console.log(event);
    });
    ws.addEventListener('open', event => {
      console.log('open shud');
      // Set the authorization header using the setRequestHeader method

      ws.send(JSON.stringify(data));
    });
    ws.addEventListener('message', event => {
      // Handle incoming message

      console.log('Message received: ', event.data);
    });
    ws.addEventListener('close', event => {
      // Handle WebSocket close event
      console.log(event);
      console.log('WebSocket connection closed.');
    });

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    // @ts-ignore
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
