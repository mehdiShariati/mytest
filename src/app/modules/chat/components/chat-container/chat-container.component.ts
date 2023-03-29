import { Component, AfterContentInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { BehaviorSubject, debounce, delay, forkJoin, fromEvent, interval, Observable } from 'rxjs';
import { map, take, debounceTime, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements AfterContentInit {
  public messagesObserver$: Observable<any[]> = new BehaviorSubject<any[]>([]);
  private isScrollerInitial: boolean = false;
  public previousPosition: number = 0;
  @ViewChild('chatContainer')
  public viewportRef!: ElementRef;
  private changeDetectionRef: ChangeDetectorRef;
  constructor(private chatService: ChatService, changeDetectionRef: ChangeDetectorRef) {
    this.changeDetectionRef = changeDetectionRef;
  }

  ngAfterContentInit(): void {
    this.messagesObserver$ = this.chatService.getMessagesObserver();
    this.messagesObserver$.subscribe((res: any) => {
      if (res) {
        let content = document.querySelector('.message-container');

        if (!this.isScrollerInitial) {
          this.isScrollerInitial = true;
          let scroll$ = fromEvent(content!, 'scroll').pipe(
            map(() => {
              return content!.scrollTop;
            }),
          );
          scroll$.subscribe(scrollPos => {
            let limit = 0;
            // this.changeDetectionRef.detectChanges();

            if (scrollPos === limit) {
              // NOTE: Depending on the type of demo, the constrained container is different.
              // And, the different containers use slightly different DOM methods for getting
              // and setting the current scroll heights and offsets. As such, the getters and
              // setters have been abstracted into other private methods. That said, the
              // algorithm is the same in both cases:
              // --
              // STEP 1: Get current scroll conditions.
              // STEP 2: Add new content and force DOM reconciliation.
              // STEP 3: Check new scroll conditions.
              // STEP 4: Update scroll settings to account for new content.
              // --

              // STEP ONE: Get the current scroll conditions for the container.
              // var preScrollHeight = this.getContainerScrollHeight();
              this.chatService.getMoreMessage();
              // Force Angular to reconcile the DOM with the View Model. This call tells
              // Angular to trigger a change-detection so that our new news item will be
              // rendered to the browser, allowing us to inspect the scroll changes.

              // STEP THREE: Now that Angular has rendered the changes in the browser, we have
              // to examine the state of the browser to see how the changes were handled.
              // var postScrollOffset = this.getContainerScrollTop();

              // In modern Chrome and Firefox, the scroll-offset will be HANDLED AUTOMATICALLY.
              // Meaning, Chrome and Firefox will UPDATE THE SCROLL OFFSET in order to maintain
              // the "current" experience for the user (how great is that?!?!). However, Safari
              // does not do this. As such, if the pre/post scroll offsets are the same, we
              // have to step-in and manually SCROLL THE USER DOWN to compensate for the change
              // in document height.

              // STEP FOUR: The browser didn't adjust the scroll offset automatically. As
              // such, we have to step in and scroll the user down imperatively.
              // var postScrollHeight = this.getContainerScrollHeight();
              // var deltaHeight = ( postScrollHeight - preScrollHeight );
              //
              // this.setScrollTop( postScrollOffset, deltaHeight );
              //
              // console.warn( "Scrolling by", deltaHeight, "px" );
            }
          });
        } else {
        }
      }
    });
  }
  // I get the current scroll height of the container.
  private getContainerScrollHeight(): number {
    return this.viewportRef.nativeElement.scrollHeight;
  }
  // I get the current scroll offset of the container.
  private getContainerScrollTop(): number {
    return this.viewportRef.nativeElement.scrollTop;
  }
  // I update the container to use the new scroll offset.
  private setScrollTop(currentScrollTop: number, delta: number): void {
    this.viewportRef.nativeElement.scrollTop = currentScrollTop + delta;

    window.scrollBy(0, delta);
  }
}
