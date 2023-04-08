import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, fromEvent, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { ProfileService } from './profile-service';
import { take } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  get disableScrollDown(): boolean {
    return this._disableScrollDown;
  }

  set disableScrollDown(value: boolean) {
    this._disableScrollDown = value;
  }
  get isSessionOver(): boolean {
    return this._isSessionOver;
  }

  set isSessionOver(value: boolean) {
    this._isSessionOver = value;
  }
  get isMessagesOver(): boolean {
    return this._isMessagesOver;
  }

  set isMessagesOver(value: boolean) {
    this._isMessagesOver = value;
  }
  get showCreateChannelContainer(): boolean {
    return this._showCreateChannelContainer;
  }

  set showCreateChannelContainer(value: boolean) {
    this._showCreateChannelContainer = value;
  }
  get showCreateGroupContainer(): boolean {
    return this._showCreateGroupContainer;
  }

  set showCreateGroupContainer(value: boolean) {
    this._showCreateGroupContainer = value;
  }
  private _disableScrollDown: boolean = false;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  private showThreeDowMenu: boolean = false;
  private _showCreateGroupContainer: boolean = false;
  private _showCreateChannelContainer: boolean = false;
  private _isMessagesOver: boolean = false;
  private _isSessionOver: boolean = false;
  private token = localStorage.getItem('token');
  public showNewMessageModal: boolean = false;
  public selectedUser: string = '';
  private _isAllowToFetchMessages: boolean = false;
  currentPage_sessions: number = 0;
  currentPage_messages: number = 0;
  currentPage_users: number = 0;
  page_size: number = 20;
  SelectedUserObs: BehaviorSubject<string> = new BehaviorSubject<string>('');
  itemUser: Observable<string> = this.SelectedUserObs.asObservable();

  SelectedUserDataObs: BehaviorSubject<object> = new BehaviorSubject<object>({});
  itemUserData: Observable<object> = this.SelectedUserDataObs.asObservable();

  //for selected message
  SelectedMessageIdObs: BehaviorSubject<any> = new BehaviorSubject<string>('');
  itemMessageId: Observable<string> = this.SelectedMessageIdObs.asObservable();

  RepliedMessageObs: BehaviorSubject<any> = new BehaviorSubject<object>({});
  itemRepliedMessageData: Observable<object> = this.RepliedMessageObs.asObservable();

  SelectedMessageDataObs: BehaviorSubject<any> = new BehaviorSubject<any>('');
  itemMessageData: Observable<any> = this.SelectedMessageDataObs.asObservable();

  obsArrayMessages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemsMessages$: Observable<any> = this.obsArrayMessages.asObservable();

  obsArrayUsers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemsUsers$: Observable<any> = this.obsArrayUsers.asObservable();

  obsArraySessions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemsSession$: Observable<any> = this.obsArraySessions.asObservable();

  obsSelectedSession: BehaviorSubject<any> = new BehaviorSubject<any>({});
  selected_session$: Observable<any> = this.obsSelectedSession.asObservable();

  obsLoadingMessage: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  loadingMessages$: Observable<any> = this.obsLoadingMessage.asObservable();

  private _isEditingMessage: boolean = false;
  private _isRepliengToAMessage: boolean = false;
  public selfUserId: string = '';
  private _MessageIdUnderOperation: string = '';

  constructor(
    private http: HttpClient,
    private profileSerive: ProfileService,
    WebsocketService: WebsocketService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<string>localStorage.getItem('currentUser')) ?? '');
    this.currentUser = this.currentUserSubject.asObservable();
    let token = localStorage.getItem('token');
    if (token) {
      let parsedToken: any = this.jwtService.DecodeToken(token);
      this.selfUserId = parsedToken.userId;
    }
    WebsocketService.messages.subscribe((msg: any) => {
      if (msg.type === 'MESSAGE' && msg.data.sessionId === this.selectedUser) {
        const currentValue = this.obsArrayMessages.value;
        const updatedValue = [...currentValue, msg.data];
        this.obsArrayMessages.next(updatedValue);

        this.disableScrollDown = true;
      }
      if (msg.type === 'MESSAGE') {
        let updatedSession;

        let sessions: any = this.obsArraySessions.value;
        sessions.map((item: any, index: any) => {
          if (item.id === msg.data.sessionId) {
            item.messagePreview.content = msg.data.content;
            if (msg.data.senderId !== this.selfUserId) {
              item.unreadMessageCount = item.unreadMessageCount ? item.unreadMessageCount + 1 : 1;
            }
            updatedSession = item;
            sessions.splice(index, 1);
          }
        });
        sessions.unshift(updatedSession);
      }
    });
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
  deleteMessage(message: any) {
    this.http.delete(`${environment.apiUrl}/chat/messages/${message.id}`).subscribe((res: any) => {
      const messagesArr: any[] = this.obsArrayMessages.getValue();

      messagesArr.forEach((item, index) => {
        if (item.id === message.id) {
          messagesArr.splice(index, 1);
        }
      });

      this.obsArrayMessages.next(messagesArr);
    });
  }
  editMessage(message_id: string, text: string) {
    const headers = { 'content-type': 'application/json', accept: '*/*' };

    return this.http.patch(
      `${environment.apiUrl}/chat/messages/${message_id}`,
      { content: text },
      { headers: headers },
    );
  }
  sendMessage(message: string, session_id: string, repliedId: string = '') {
    const headers = { 'content-type': 'multipart/form-data', accept: '*/*' };

    let value = new FormData();
    value.set('type', 'TEXT');
    value.set('text', message);
    if (repliedId) {
      value.set('repliedId', repliedId);
    }
    return this.http.post(`${environment.apiUrl}/chat/messages/send/${session_id}`, value, {});
  }
  seenMessage(message_id: string) {
    return this.http.post(`${environment.apiUrl}/chat/messages/seen/${message_id}`, null, {});
  }
  public getNewMessage = () => {
    // console.log(this.ws);
  };
  toggleThreeDotMenu() {
    this.showThreeDowMenu = !this.showThreeDowMenu;
  }
  getShowThreeDowMenu() {
    return this.showThreeDowMenu;
  }
  toggleShowNewMessageModal() {
    this.showNewMessageModal = !this.showNewMessageModal;
  }
  setSelectedSession(user: any) {
    this.isAllowToFetchMessages = false;
    this.isMessagesOver = false;
    this.selectedUser = user['id'];
    this.SelectedUserObs.next(user['id']);
    this.SelectedUserDataObs.next(user);

    let session = this.obsArraySessions.value.filter((item: any) => {
      return item.id === user['id'];
    });
    if (session.length) {
      this.obsSelectedSession.next(session[0]);
      this.isAllowToFetchMessages = true;
      this.initialMessageSubject();
    } else {
      this.isMessagesOver = true;
      if (user?.id) {
        let currentValue = this.obsArraySessions.value;
        let newSession = {
          id: user['id'],
          imageUrl: user?.personnel?.personnelPhotoUrl,
          messagePreview: null,
          extraInfo: {
            name:
              user?.personnel?.firstName || user?.personnel?.lastName
                ? `${user?.personnel?.firstName}  ${user?.personnel?.lastName}`
                : user.username,
          },
        };
        let updatedValue = [...currentValue, newSession];
        this.obsArraySessions.next(updatedValue);
        this.obsSelectedSession.next(newSession);
      }
    }
  }
  setSelectedMessage(message: any) {
    this.SelectedMessageDataObs.next(message);
    this.SelectedMessageIdObs.next(message.id);
  }
  getSelectedMessageIdObserver() {
    return this.itemMessageId;
  }
  getSelectedMessageDataObserver() {
    return this.itemMessageData;
  }
  getSelectedUser() {
    return this.itemUser;
  }
  getSelectedSession() {
    return this.selected_session$;
  }
  getSelectedUserData() {
    return this.itemUserData;
  }
  get isAllowToFetchMessages(): boolean {
    return this._isAllowToFetchMessages;
  }

  set isAllowToFetchMessages(value: boolean) {
    this._isAllowToFetchMessages = value;
  }
  get MessageIdUnderOperation(): string {
    return this._MessageIdUnderOperation;
  }

  set MessageIdUnderOperation(value: string) {
    this._MessageIdUnderOperation = value;
  }
  get isRepliengToAMessage(): boolean {
    return this._isRepliengToAMessage;
  }

  set isRepliengToAMessage(value: boolean) {
    this._isRepliengToAMessage = value;
  }
  get isEditingMessage(): boolean {
    return this._isEditingMessage;
  }

  set isEditingMessage(value: boolean) {
    this._isEditingMessage = value;
  }
  getRepliedMessageDataObserver() {
    return this.itemRepliedMessageData;
  }
  setRepliedMessageData(message: object) {
    this.isRepliengToAMessage = true;
    return this.RepliedMessageObs.next(message);
  }
  discardRepliedMessage() {
    this.isRepliengToAMessage = false;
    return this.RepliedMessageObs.next({});
  }

  initialMessageSubject() {
    this.getSelectedUser().subscribe((res: any) => {
      if (res) {
        if (this.isAllowToFetchMessages) {
          this.currentPage_messages = 0;
          this.getMessages(this.selectedUser, this.currentPage_messages, this.page_size).subscribe((result: any) => {
            this.obsArrayMessages.next(result.content.reverse());

            this.seenLastMessage();
          });
        }
      }
    });
  }
  seenLastMessage() {
    this.seenMessage(this.obsArrayMessages.value.at(-1).id).subscribe();
  }
  getLoadingMessagesObserver(): any {
    return this.loadingMessages$;
  }
  getMessagesObserver(): any {
    this.initialMessageSubject();
    return this.itemsMessages$;
  }

  getMoreMessage() {
    if (!this.isMessagesOver) {
      this.currentPage_messages++;
      forkJoin([
        this.itemsMessages$.pipe(take(1)),
        this.getMessages(this.selectedUser, this.currentPage_messages, this.page_size),
      ]).subscribe((data: any) => {
        console.log(data[1]);
        if (data[1].content.length) {
          this.obsArrayMessages.next([...data[1].content.reverse(), ...data[0]]);
          this.obsLoadingMessage.next(true);
        } else {
          this.isMessagesOver = true;
          this.currentPage_messages = 0;
        }
      });
    }
  }

  onMessage(message: string): void {
    if (this.isEditingMessage) {
      let msg = message;

      this.editMessage(this.MessageIdUnderOperation, msg).subscribe((res: any) => {
        const messagesArr: any[] = this.obsArrayMessages.getValue();

        messagesArr.forEach(item => {
          if (item.id === this.MessageIdUnderOperation) {
            // @ts-ignore
            item.content = msg;
          }
        });

        this.obsArrayMessages.next(messagesArr);
        this.MessageIdUnderOperation = '';
      });
    } else if (this.isRepliengToAMessage) {
      let replyId = this.RepliedMessageObs.value;
      this.sendMessage(message, this.selectedUser, replyId.id).subscribe((res: any) => {});
      this.discardRepliedMessage();
    } else {
      this.sendMessage(message, this.selectedUser).subscribe((res: any) => {});
    }
  }

  getUsersObserver(): any {
    this.userService.getUser({ pageNumber: 0, pageSize: this.page_size }).subscribe((res: any) => {
      this.obsArrayUsers.next(res.content);
    });

    return this.itemsUsers$;
  }

  getMoreUsers() {
    this.currentPage_users++;
    forkJoin([
      this.itemsUsers$.pipe(take(1)),
      this.userService.getUser({ pageNumber: this.currentPage_users, pageSize: this.page_size }),
    ]).subscribe((data: any) => {
      if (data[1].content) {
        const newArr = [...data[0], ...data[1].content];
        this.obsArrayUsers.next(newArr);
      } else {
        this.obsArrayUsers.complete();
      }
    });
  }

  getWholeValueOfUsers() {
    return this.obsArrayUsers.getValue();
  }

  createGroup(groupName: string, selectedUser: Array<string>, File: any) {
    let headers = { 'content-type': 'multipart/form-data', accept: '*/*' };
    headers = { 'content-type': 'multipart/form-data', accept: '*/*' };
    console.log(JSON.stringify(selectedUser));
    let value = new FormData();
    value.set('name', groupName);
    value.set('members', JSON.stringify(selectedUser));
    value.set('file', File);
    return this.http.post(`${environment.apiUrl}/chat/groups`, value, {});
  }

  getSessionsObserver(): any {
    this.getSessions(this.currentPage_sessions, 100).subscribe((res: any) => {
      this.obsArraySessions.next(res);
    });

    return this.itemsSession$;
  }

  getMoreSessions() {
    this.currentPage_sessions++;
    forkJoin([this.itemsSession$.pipe(take(1)), this.getSessions(this.currentPage_sessions, 100)]).subscribe(
      (data: any) => {
        if (data) {
          this.obsArrayUsers.next([...data]);
        } else {
          this.isSessionOver = true;
          this.obsArraySessions.complete();
        }
      },
    );
  }
}
