import { Component, AfterContentInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { BehaviorSubject, debounce, forkJoin, fromEvent, interval, Observable } from 'rxjs';
import { map, take, debounceTime, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements AfterContentInit {
  public currentPage_messages: number = 0;
  public pageSize: number = 20;
  public messagesObserver$: Observable<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private chatService: ChatService) {}

  ngAfterContentInit(): void {
    this.messagesObserver$ = this.chatService.getMessagesObserver();
    this.messagesObserver$.subscribe((res: any) => {
      if (res) {
        let content = document.querySelector('.message-container');

        let scroll$ = fromEvent(content!, 'scroll').pipe(
          map(() => {
            return content!.scrollTop;
          }),
          debounceTime(100),
          distinct(),
        );

        scroll$.subscribe(scrollPos => {
          let limit = 0;

          if (scrollPos === limit) {
            this.chatService.getMoreMessage(this.currentPage_messages);
          }
        });
      }
    });
  }
}
