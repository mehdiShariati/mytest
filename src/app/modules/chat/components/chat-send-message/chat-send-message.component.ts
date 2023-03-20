import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-send-message',
  templateUrl: './chat-send-message.component.html',
  styleUrls: ['./chat-send-message.component.scss'],
})
export class ChatSendMessageComponent {
  public message: string = '';
  private allow_to_type_message: boolean = false;
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.getSelectedUser().subscribe((res: any) => {
      if (res.length) {
        this.allow_to_type_message = true;
      }
    });
  }

  sendMessage(event: any) {
    if (this.message && this.allow_to_type_message) {
      this.chatService.onMessage(this.message);
      this.message = '';
    }
  }
}
