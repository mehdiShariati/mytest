import { Component, AfterContentInit } from '@angular/core';
import { BehaviorSubject, delay, forkJoin, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinct, map, take } from 'rxjs/operators';
import { ChatService } from '../../../../core/services/chat.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat-session-container',
  templateUrl: './chat-session-container.component.html',
  styleUrls: ['./chat-session-container.component.scss'],
})
export class ChatSessionContainerComponent implements AfterContentInit {
  itemsSession$: Observable<any | Object> = new BehaviorSubject<any[]>([{}]).pipe(delay(0));
  public active_session: string = '';
  public resource_path = environment.apiToken;
  private initialScrollListener: boolean = false;
  private scrollObserver$: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getSelectedUser().subscribe((res: any) => {
      if (res) {
        this.active_session = res;
      }
    });
  }

  ngAfterContentInit(): void {
    this.itemsSession$ = this.chatService.getSessionsObserver();
    this.itemsSession$.subscribe((res: any) => {
      if (res) {
        if (!this.initialScrollListener) {
          const content = document.querySelector('#sessions_container');
          this.scrollObserver$ = fromEvent(content!, 'scroll').pipe(
            map(() => {
              return content!.scrollTop;
            }),
            debounceTime(100),
            distinct(),
          );
          this.scrollObserver$.subscribe((scrollPos: any) => {
            let limit = content!.scrollHeight - content!.clientHeight;
            if (scrollPos === limit && !this.chatService.isSessionOver) {
              this.chatService.getMoreSessions();
            }
          });
          this.initialScrollListener = true;
        }
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
