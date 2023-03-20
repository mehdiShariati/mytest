import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChatMenuContainerComponent } from './components/chat-menu-container/chat-menu-container.component';
import { ChatNewChatComponent } from './components/chat-new-chat/chat-new-chat.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatChannelModalComponent } from './components/chat-channel-modal/chat-channel-modal.component';
import { ChatGroupModalComponent } from './components/chat-group-modal/chat-group-modal.component';
import { ChatGroupContainerComponent } from './components/chat-group-container/chat-group-container.component';
import { ChatChannelContainerComponent } from './components/chat-channel-container/chat-channel-container.component';
import { ChatSendMessageComponent } from './components/chat-send-message/chat-send-message.component';
import { ChatCreateGroupContainerComponent } from './components/chat-create-group-container/chat-create-group-container.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChatSessionContainerComponent } from './components/chat-session-container/chat-session-container.component';

@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    ChatMenuContainerComponent,
    ChatNewChatComponent,
    ChatContainerComponent,
    ChatMessageComponent,
    ChatChannelModalComponent,
    ChatGroupModalComponent,
    ChatGroupContainerComponent,
    ChatChannelContainerComponent,
    ChatSendMessageComponent,
    ChatCreateGroupContainerComponent,
    ChatSessionContainerComponent,
  ],
  imports: [
    CommonModule,
    BadgeModule,
    InputTextModule,
    InlineSVGModule,
    FormsModule,
    ContextMenuModule,
    MenuModule,
    DialogModule,
    ScrollPanelModule,
    CheckboxModule,
  ],
})
export class ChatModule {}
