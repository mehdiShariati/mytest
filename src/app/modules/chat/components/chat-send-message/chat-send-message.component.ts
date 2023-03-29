import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-send-message',
  templateUrl: './chat-send-message.component.html',
  styleUrls: ['./chat-send-message.component.scss'],
})
export class ChatSendMessageComponent {
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
    let mesg = event.target.value;
    if (mesg.length && this.allow_to_type_message) {
      this.chatService.onMessage(mesg);
      event.target.value = '';
    }
  }
}
