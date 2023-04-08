import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-chat-send-message',
  templateUrl: './chat-send-message.component.html',
  styleUrls: ['./chat-send-message.component.scss'],
})
export class ChatSendMessageComponent {
  private allow_to_type_message: boolean = false;
  public show_replieng_tooltip: boolean = false;
  public replieng_text: string = '';
  private replieng_person: string = '';
  public repliedMessageDataObserver$: Observable<any> = new BehaviorSubject<any>({});
  show_emoji_container: boolean = false;
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.getSelectedUser().subscribe((res: any) => {
      if (res.length) {
        this.allow_to_type_message = true;
      }
    });
    this.chatService.getRepliedMessageDataObserver().subscribe((res: any) => {
      if (res && this.chatService.isRepliengToAMessage) {
        this.show_replieng_tooltip = true;
        this.replieng_text = res.content;
      } else {
        this.show_replieng_tooltip = false;
        this.replieng_text = '';
      }
    });
  }

  sendMessage(event: any) {
    let mesg = event.target.value;
    if (mesg.length && this.allow_to_type_message) {
      this.chatService.onMessage(mesg);
      event.target.value = '';
    }
  }
  toggleEmojiContainer(event: Event) {
    event.stopPropagation();
    this.show_emoji_container = !this.show_emoji_container;
  }
  addEmoji(event: any) {
    this.messageInput.nativeElement.focus();
    const selectionStart = this.messageInput.nativeElement.selectionStart;
    const currentValue = this.messageInput.nativeElement.value;
    this.messageInput.nativeElement.value =
      currentValue.substring(0, selectionStart) + event.emoji.native + currentValue.substring(selectionStart);

    // the following 2 lines set the caret position behind the emoji
    this.messageInput.nativeElement.selectionStart = selectionStart + event.emoji.native.length;
    this.messageInput.nativeElement.selectionEnd = selectionStart + event.emoji.native.length;
    this.show_emoji_container = false;
    // console.log(String.fromCodePoint(event.emoji.unified));
  }
}
