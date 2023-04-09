import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('spinnerUser') spinnerUser!: ElementRef;
  constructor(private chatService: ChatService, private userService: UserService) {}
  ngAfterViewInit(): void {
    this.itemsUsers$ = this.chatService.getUsersObserver();
    let elem = this.spinnerUser.nativeElement;
    const threshold = 0.5; // how much % of the element is in view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!this.isAllUserLoaded()) {
              this.chatService.getMoreUsers();
            } else {
              observer.disconnect();
            }
          }
        });
      },
      { threshold },
    );
    observer.observe(elem);
  }

  showNewChatModal() {
    return this.chatService.showNewMessageModal;
  }
  isAllUserLoaded() {
    return this.chatService.allUsersLoaded;
  }
  toggleNewChatModal() {
    this.chatService.toggleShowNewMessageModal();
  }
  selectUser(user: any) {
    this.chatService.setSelectedSession(user);
    this.toggleNewChatModal();
  }
}
