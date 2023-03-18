import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  private token = localStorage.getItem('token');

  // public ws = new WebSocket(`ws://172.31.112.51:8081/api/chat/ws?authorization=Bearer${this.token}`);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<string>localStorage.getItem('currentUser')) ?? '');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getSessions(page_number: number = 0, page_size: number = 100) {
    return this.http.get(`${environment.apiUrl}/chat/sessions?pageNumber=${page_number}&pageSize=${page_size}`);
  }
  getMessages(session_id: string, page_number: number = 0, page_size: number = 100) {
    return this.http.get(
      `${environment.apiUrl}/chat/messages/${session_id}?pageNumber=${page_number}&pageSize=${page_size}&sort=DESC&sortKey=createdDate`,
    );
  }
  deleteMessage(message_id: string) {
    return this.http.delete(`${environment.apiUrl}/chat/messages/${message_id}`);
  }
  editMessage(message_id: string, text: string) {
    const headers = { 'content-type': 'application/json', accept: '*/*' };

    return this.http.patch(
      `${environment.apiUrl}/chat/messages/${message_id}`,
      { content: text },
      { headers: headers },
    );
  }
  sendMessage(message: string, session_id: string) {
    const headers = { 'content-type': 'multipart/form-data', accept: '*/*' };

    let value = new FormData();
    value.set('type', 'TEXT');
    value.set('text', message);
    return this.http.post(`${environment.apiUrl}/chat/messages/send/${session_id}`, value, {});
  }

  public getNewMessage = () => {
    // console.log(this.ws);
  };
}
