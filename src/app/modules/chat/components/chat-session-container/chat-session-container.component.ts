import { Component, AfterViewInit } from '@angular/core';
import { BehaviorSubject, forkJoin, fromEvent, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ChatService } from '../../../../core/services/chat.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat-session-container',
  templateUrl: './chat-session-container.component.html',
  styleUrls: ['./chat-session-container.component.scss'],
})
export class ChatSessionContainerComponent implements AfterViewInit {
  itemsSession$: Observable<any | Object> = new BehaviorSubject<any[]>([{}]);
  public active_session: string = '';
  public resource_path = environment.apiToken;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getSelectedUser().subscribe((res: any) => {
      if (res) {
        this.active_session = res;
      }
    });
  }

  ngAfterViewInit(): void {
    this.itemsSession$ = this.chatService.getSessionsObserver();
    this.itemsSession$.subscribe((res: any) => {
      if (res) {
        const content = document.querySelector('.sessions_container');
        const scroll$ = fromEvent(content!, 'scroll').pipe(
          map(() => {
            return content!.scrollTop;
          }),
        );
        scroll$.subscribe(scrollPos => {
          let limit = content!.scrollHeight - content!.clientHeight;
          if (scrollPos === limit) {
            this.chatService.getMoreSessions();
          }
        });
      }
    });
  }
  SetActiveSession(active_user: object) {
    this.chatService.setSelectedSession(active_user);
  }
  getDate(date: string) {
    let today = new Date();
    let InputDate = new Date(date);
    if (
      today.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }) ===
      InputDate.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' })
    ) {
      return `${InputDate.getHours()}:${InputDate.getMinutes()}`;
    } else {
      return InputDate.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' });
    }
  }
}
