import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-session-header',
  templateUrl: './chat-session-header.component.html',
  styleUrls: ['./chat-session-header.component.scss'],
})
export class ChatSessionHeaderComponent {
  constructor(private chatService: ChatService) {}
  togglePencilMenu() {
    this.chatService.toggleThreeDotMenu();
  }
}
