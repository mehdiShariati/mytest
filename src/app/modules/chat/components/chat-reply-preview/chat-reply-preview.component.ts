import { Component, Input } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-reply-preview',
  templateUrl: './chat-reply-preview.component.html',
  styleUrls: ['./chat-reply-preview.component.scss'],
})
export class ChatReplyPreviewComponent {
  @Input('message') message: string = '';
  @Input('replay_person') replay_person: string = '';
  constructor(private chatService: ChatService) {}
  discard_reply() {
    this.chatService.discardRepliedMessage();
  }
}
