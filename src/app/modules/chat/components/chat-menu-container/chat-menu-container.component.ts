import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-menu-container',
  templateUrl: './chat-menu-container.component.html',
  styleUrls: ['./chat-menu-container.component.scss'],
})
export class ChatMenuContainerComponent {
  constructor(private chatService: ChatService) {}
  toggleThreeDotMenu() {
    this.chatService.toggleThreeDotMenu();
  }
  showMenu() {
    return this.chatService.getShowThreeDowMenu();
  }
  onNewChat() {
    this.chatService.toggleThreeDotMenu;
    this.chatService.toggleShowNewMessageModal();
  }
  onNewChannel() {
    this.chatService.showCreateChannelContainer = true;
    this.chatService.toggleThreeDotMenu;
  }
  onNewGroup() {
    this.chatService.showCreateGroupContainer = true;
    this.chatService.toggleThreeDotMenu;
  }
}
