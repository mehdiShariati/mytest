import { Component, AfterContentInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import {
  BehaviorSubject,
  debounce,
  delay,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  interval,
  Observable,
  Subject,
} from 'rxjs';
import { map, take, debounceTime, distinct } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import set = Reflect.set;

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements AfterContentInit {
  public messagesObserver$: Observable<any[]> = new BehaviorSubject<any[]>([]);
  private isScrollerInitial: boolean = false;
  onScrolling: Subject<any> = new Subject<any>();
  onloadingContent$: Observable<any[]> = new BehaviorSubject<any[]>([]);
  messages: Array<any> = [];
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  public viewportRef!: ElementRef;
  private changeDetectionRef: ChangeDetectorRef;
  private tempHeight: number = 0;
  contextMenuItems: MenuItem[] = [];
  @ViewChild('contextMenu', { static: false })
  contextMenu!: ContextMenu;
  initialized_subscribe_selectedMessage: boolean = false;

  constructor(private chatService: ChatService, changeDetectionRef: ChangeDetectorRef) {
    this.changeDetectionRef = changeDetectionRef;
    this.contextMenuItems = [
      {
        label: 'پاسخ',
        icon: 'pi pi-fw pi-replay',
      },
      {
        label: 'ویرایش',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'حذف',
        icon: 'pi pi-fw pi-trash',
      },
    ];
  }
  openContextMenu(event: MouseEvent, message: any): void {
    this.contextMenuItems = [
      {
        label: 'پاسخ',
        icon: 'pi pi-fw pi-replay',
        command: event => this.replyMessage(message),
      },
    ];
    if (this.isMessageSelf(message)) {
      this.contextMenuItems.push(
        {
          label: 'ویرایش',
          icon: 'pi pi-fw pi-pencil',
          command: event => this.editMessage(message),
        },
        {
          label: 'حذف',
          icon: 'pi pi-fw pi-trash',
          command: event => this.deleteMessage(message),
        },
      );
    }
    this.contextMenu.show(event);
    event.stopPropagation();
  }
  ngOnInit() {
    this.chatService.obsGoTobottom.subscribe((res: boolean) => {
      if (res) {
        this.scrollToBottom();
      }
    });
  }
  ngAfterContentInit(): void {
    this.messagesObserver$ = this.chatService.getMessagesObserver();

    this.messagesObserver$.subscribe((res: any) => {
      if (res.length) {
        this.itemToObserve();
      }
    });

    let endOfContainer = document.querySelector('.bottomOfChat');
    const threshold = 1; // how much % of the element is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.chatService.disableScrollDown = false;
        } else {
          this.chatService.disableScrollDown = true;
        }
      });
    });
    observer.observe(endOfContainer!);

    this.chatService
      .getLoadingMessagesObserver()
      .pipe(debounceTime(100))
      .subscribe((res: any) => {
        this.chatContainer.nativeElement.scrollTo(0, this.getContainerScrollTop() - this.tempHeight);
      });
  }

  // ngAfterViewInit()
  // {
  //   const ob = new IntersectionObserver(this.obCallback);
  //   ob.observe(this.chatContainer.nativeElement);
  // }

  // this.messagesObserver$.subscribe((res: any) => {
  //   if (res) {
  //     let content = document.querySelector('.message-container');
  //
  //     if (!this.isScrollerInitial) {
  //       this.isScrollerInitial = true;
  //       let scroll$ = fromEvent(content!, 'scroll').pipe(
  //         map(() => {
  //           return content!.scrollTop;
  //         }),
  //       );
  //       scroll$.subscribe(scrollPos => {
  //         let limit = 0;
  //         // this.changeDetectionRef.detectChanges();
  //
  //         if (scrollPos === limit) {
  //           // NOTE: Depending on the type of demo, the constrained container is different.
  //           // And, the different containers use slightly different DOM methods for getting
  //           // and setting the current scroll heights and offsets. As such, the getters and
  //           // setters have been abstracted into other private methods. That said, the
  //           // algorithm is the same in both cases:
  //           // --
  //           // STEP 1: Get current scroll conditions.
  //           // STEP 2: Add new content and force DOM reconciliation.
  //           // STEP 3: Check new scroll conditions.
  //           // STEP 4: Update scroll settings to account for new content.
  //           // --
  //
  //           // STEP ONE: Get the current scroll conditions for the container.
  //           // var preScrollHeight = this.getContainerScrollHeight();
  //           this.chatService.getMoreMessage();
  //           // Force Angular to reconcile the DOM with the View Model. This call tells
  //           // Angular to trigger a change-detection so that our new news item will be
  //           // rendered to the browser, allowing us to inspect the scroll changes.
  //
  //           // STEP THREE: Now that Angular has rendered the changes in the browser, we have
  //           // to examine the state of the browser to see how the changes were handled.
  //           // var postScrollOffset = this.getContainerScrollTop();
  //
  //           // In modern Chrome and Firefox, the scroll-offset will be HANDLED AUTOMATICALLY.
  //           // Meaning, Chrome and Firefox will UPDATE THE SCROLL OFFSET in order to maintain
  //           // the "current" experience for the user (how great is that?!?!). However, Safari
  //           // does not do this. As such, if the pre/post scroll offsets are the same, we
  //           // have to step-in and manually SCROLL THE USER DOWN to compensate for the change
  //           // in document height.
  //
  //           // STEP FOUR: The browser didn't adjust the scroll offset automatically. As
  //           // such, we have to step in and scroll the user down imperatively.
  //           // var postScrollHeight = this.getContainerScrollHeight();
  //           // var deltaHeight = ( postScrollHeight - preScrollHeight );
  //           //
  //           // this.setScrollTop( postScrollOffset, deltaHeight );
  //           //
  //           // console.warn( "Scrolling by", deltaHeight, "px" );
  //         }
  //       });
  //     } else {
  //     }
  //   }
  // });
  // }
  isMessageSelf(message: any) {
    if (message.senderId === this.chatService.selfUserId) {
      return true;
    }
    return false;
  }
  private itemToObserve() {
    setTimeout(() => {
      let elem = this.chatContainer.nativeElement.children[0];
      const threshold = 0.5; // how much % of the element is in view
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // run your animation code here
              this.tempHeight = this.getContainerScrollTop();
              this.chatService.getMoreMessage();
              observer.disconnect(); // disconnect if you want to stop observing else it will rerun every time its back in view. Just make sure you disconnect in ngOnDestroy instead
            }
          });
        },
        { threshold },
      );
      observer.observe(elem);
    }, 500);

    // let observer = new IntersectionObserver(function (entries, self) {
    //   entries.forEach(entry => {
    //     console.log(entry);
    //     if (entry.isIntersecting) {
    //
    //     }
    //   });
    // }, config);

    // observer.observe(elem);

    // const threshold = 0.5; // how much % of the element is in view
    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       console.log(entry);
    //       if (entry.isIntersecting) {
    //         // run your animation code here
    //         console.log(entry);
    //      //   observer.disconnect(); // disconnect if you want to stop observing else it will rerun every time its back in view. Just make sure you disconnect in ngOnDestroy instead
    //       }
    //     });
    //   },
    //   { threshold,
    //   }
    // );
  }
  // // I get the current scroll height of the container.
  // private getContainerScrollHeight(): number {
  //   return this.viewportRef.nativeElement.scrollHeight;
  // }
  // // I get the current scroll offset of the container.
  showScrollTobottomBtn() {
    return this.chatService.disableScrollDown;
  }
  private getContainerScrollTop(): number {
    return this.chatContainer.nativeElement.scrollHeight;
  }
  private isScrollable() {
    return this.chatContainer.nativeElement.scrollHeight > this.chatContainer.nativeElement.clientHeight;
  }
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTo(0, this.getContainerScrollTop() + 500);
    } catch (err) {}
  }
  // // I update the container to use the new scroll offset.
  // private setScrollTop(currentScrollTop: number, delta: number): void {
  //   this.viewportRef.nativeElement.scrollTop = currentScrollTop + delta;
  //
  //   window.scrollBy(0, delta);
  // }
  scrolling(event: any) {
    this.tempHeight = this.getContainerScrollTop();
    //this.onScrolling.next(event);
  }
  editMessage(message: any) {
    this.chatService.isEditingMessage = true;
    this.chatService.setSelectedMessage(message);
  }
  deleteMessage(message: any) {
    this.chatService.deleteMessage(message);
  }
  replyMessage(message: any) {
    this.chatService.setRepliedMessageData(message);
  }
}
