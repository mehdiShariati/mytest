import { Component, Input } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() public message: any;

  constructor(private chatService: ChatService) {}
  isMessageSelf() {
    if (this.message.senderId === this.chatService.selfUserId) {
      return true;
    }
    return true;
  }
  isMessageTypeText() {
    return this.message.type === 'TEXT';
  }
  getDateOrTime() {
    let today = new Date();
    let InputDate = new Date(this.message.createdDate);
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
