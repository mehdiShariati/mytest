import { Component, AfterViewInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { UserService } from '../../../../core/services/user.service';
import { BehaviorSubject, forkJoin, fromEvent, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat-new-chat',
  templateUrl: './chat-new-chat.component.html',
  styleUrls: ['./chat-new-chat.component.scss'],
})
export class ChatNewChatComponent implements AfterViewInit {
  itemsUsers$: Observable<any> = new BehaviorSubject<any[]>([]);
  public resource_path = environment.apiToken;

  constructor(private chatService: ChatService, private userService: UserService) {}
  ngAfterViewInit(): void {
    this.itemsUsers$ = this.chatService.getUsersObserver();
    this.itemsUsers$.subscribe((res: any) => {
      if (res) {
        const content = document.querySelector('.new-chat-users');
        const scroll$ = fromEvent(content!, 'scroll').pipe(
          map(() => {
            return content!.scrollTop;
          }),
        );
        scroll$.subscribe(scrollPos => {
          let limit = content!.scrollHeight - content!.clientHeight;
          if (scrollPos === limit) {
            this.chatService.getMoreUsers();
          }
        });
      }
    });
  }

  showNewChatModal() {
    return this.chatService.showNewMessageModal;
  }
  toggleNewChatModal() {
    this.chatService.toggleShowNewMessageModal();
  }
  selectUser(user: any) {
    this.chatService.setSelectedSession(user);
    this.toggleNewChatModal();
  }
}
