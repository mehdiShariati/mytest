import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { environment } from '../../../../../environments/environment';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { BehaviorSubject, forkJoin, fromEvent, Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { ScrollToBottomDirective } from '../../../../core/directives/scroll-to-bottom-directive';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  public active_session: null | string = null;
  public messages: any = [];
  public sessions = [];
  public resource_path = environment.apiToken;
  public active_session_data: any = null;
  obsArraySessions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemsSession$: Observable<any> = this.obsArraySessions.asObservable();
  obsArrayMessages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemsMessages$: Observable<any> = this.obsArrayMessages.asObservable();
  currentPage_sessions: number = 0;
  currentPage_messages: number = 0;
  pageSize: number = 30;
  obsSelectedSession: BehaviorSubject<any> = new BehaviorSubject<any>({});
  selected_session$: Observable<any> = this.obsSelectedSession.asObservable();
  contextMenuItems: MenuItem[] = [];
  public threeDotMenuShow: boolean = false;
  select_edit_message_id: string = '';
  is_editing_message: boolean = false;
  public initial_scroll: boolean = true;
  public scroll_height: number = 0;
  public show_search_modal: boolean = false;
  public isAllowToFetchMessages: boolean = false;

  @ViewChild('contextMenu', { static: false })
  contextMenu!: ContextMenu;

  message: any;
  constructor(public chatService: ChatService, public WebsocketService: WebsocketService) {
    this.contextMenuItems = [
      {
        label: 'ویرایش',
        icon: 'pi pi-fw pi-pencil',
        command: (event: any) => {
          return console.log(event.target);
        },
      },
      { separator: true },
      {
        label: 'حذف',
        icon: 'pi pi-fw pi-trash',
      },
    ];

    // WebsocketService.messages.subscribe((msg: any) => {
    //   const currentValue = this.obsArrayMessages.value;
    //   const updatedValue = [...currentValue, msg.data];
    //   this.obsArrayMessages.next(updatedValue);
    // });
  }
  openContextMenu(event: MouseEvent, id: any): void {
    this.contextMenuItems = [
      {
        label: 'ویرایش',
        icon: 'pi pi-fw pi-pencil',
        command: event => this.editMessage(id),
      },
      {
        label: 'حذف',
        icon: 'pi pi-fw pi-trash',
        command: event => this.deleteMessage(id),
      },
    ];
    this.contextMenu.show(event);
    event.stopPropagation();
  }
  editMessage(id: any) {
    this.is_editing_message = true;
    this.select_edit_message_id = id;
    const messagesArr: any[] = this.obsArrayMessages.getValue();

    let selected_message: any = messagesArr.filter(item => {
      return item.id === id;
    });
    this.message = selected_message[0]?.content;
  }
  deleteMessage(id: any) {
    this.chatService.deleteMessage(id).subscribe((res: any) => {
      const messagesArr: any[] = this.obsArrayMessages.getValue();

      messagesArr.forEach((item, index) => {
        if (item.id === id) {
          messagesArr.splice(index, 1);
        }
      });

      this.obsArrayMessages.next(messagesArr);
    });
  }
  ngOnInit() {
    // this.chatService.getSelectedUser().subscribe((res: any) => {
    //   if (res) {
    //     this.active_session = res;
    //     this.getActiveSessionInfo();
    //     if (this.chatService.isAllowToFetchMessages) {
    //       this.currentPage_messages = 0;
    //       this.chatService.getMessages(res, this.currentPage_messages, this.pageSize).subscribe((res: any) => {
    //         this.obsArrayMessages.next(res.content.reverse());
    //       });
    //       const content = document.querySelector('.chat-conatainer');
    //       const scroll$ = fromEvent(content!, 'scroll').pipe(
    //         map(() => {
    //           return content!.scrollTop;
    //         }),
    //       );
    //
    //       scroll$.subscribe(scrollPos => {
    //         let limit = 0;
    //
    //         if (scrollPos === limit) {
    //           this.initial_scroll = false;
    //           this.currentPage_messages++;
    //           forkJoin([
    //             this.itemsMessages$.pipe(take(1)),
    //             this.chatService.getMessages(res, this.currentPage_messages, this.pageSize),
    //           ]).subscribe((data: any) => {
    //             this.obsArrayMessages.next([...data[1].content.reverse(), ...data[0]]);
    //           });
    //           this.scroll_height = content!.scrollHeight;
    //         }
    //       });
    //     }
    //   }
    // });
  }
  //
  // ngAfterContentInit(): void {
  //   this.chatService.getSessions(this.currentPage_sessions, this.pageSize).subscribe((res: any) => {
  //     this.obsArraySessions.next(res);
  //   });
  //   const content = document.querySelector('#sessions_container');
  //   const scroll$ = fromEvent(content!, 'scroll').pipe(
  //     map(() => {
  //       return content!.scrollTop;
  //     }),
  //   );
  //
  //   scroll$.subscribe(scrollPos => {
  //     let limit = content!.scrollHeight - content!.clientHeight;
  //     if (scrollPos === limit) {
  //       this.currentPage_sessions++;
  //       forkJoin([
  //         this.itemsSession$.pipe(take(1)),
  //         this.chatService.getSessions(this.currentPage_sessions, this.pageSize),
  //       ]).subscribe((data: Array<Array<any>>) => {
  //         const newArr = [...data];
  //         this.obsArraySessions.next(newArr);
  //       });
  //     }
  //   });
  // }
  // SetActiveSession(active_user: object) {
  //   this.chatService.setSelectedSession(active_user);
  // }
  // getActiveSessionInfo(): any {
  //   if (this.active_session) {
  //     let session = this.obsArraySessions.value.filter((item: any) => {
  //       return item.id === this.active_session;
  //     });
  //     if (session.length) {
  //       this.chatService.isAllowToFetchMessages = true;
  //       this.obsSelectedSession.next(session[0]);
  //     } else {
  //       this.chatService.getSelectedUserData().subscribe((res: any) => {
  //         if (res?.id) {
  //           let currentValue = this.obsArraySessions.value;
  //           let newSession = {
  //             id: this.active_session,
  //             imageUrl: res?.personnel?.personnelPhotoUrl,
  //             messagePreview: null,
  //             extraInfo: {
  //               name:
  //                 res?.personnel?.firstName || res?.personnel?.lastName
  //                   ? `${res?.personnel?.firstName}  ${res?.personnel?.lastName}`
  //                   : res.username,
  //             },
  //           };
  //           let updatedValue = [...currentValue, newSession];
  //           this.obsArraySessions.next(updatedValue);
  //           this.obsSelectedSession.next(newSession);
  //         }
  //       });
  //     }
  //   }
  // }
  // sendMessage(event: any) {
  //   if (this.message && this.active_session) {
  //     if (this.is_editing_message) {
  //       let msg = this.message;
  //
  //       this.chatService.editMessage(this.select_edit_message_id, this.message).subscribe((res: any) => {
  //         const messagesArr: any[] = this.obsArrayMessages.getValue();
  //
  //         messagesArr.forEach(item => {
  //           if (item.id === this.select_edit_message_id) {
  //             // @ts-ignore
  //             item.content = msg;
  //           }
  //         });
  //
  //         this.obsArrayMessages.next(messagesArr);
  //         this.select_edit_message_id = '';
  //       });
  //     } else {
  //       this.chatService.sendMessage(this.message, this.active_session).subscribe((res: any) => {});
  //     }
  //     this.message = '';
  //   }
  // }
  // getDate(date: string) {
  //   let today = new Date();
  //   let InputDate = new Date(date);
  //   if (
  //     today.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }) ===
  //     InputDate.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' })
  //   ) {
  //     return InputDate.toLocaleDateString('fa-IR', { hour: 'numeric', minute: 'numeric' });
  //   } else {
  //     return InputDate.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' });
  //   }
  // }
  toggleThreeDotMenu() {
    this.chatService.toggleThreeDotMenu();
  }
  showCreateGroupContainer() {
    return this.chatService.showCreateGroupContainer;
  }
}
