import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { environment } from '../../../../../environments/environment';
import { WebsocketService } from '../../../../core/services/websocket.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public active_session: null | string = null;
  public messages: any = [];
  public sessions = [];
  public resource_path = environment.apiToken;
  public active_session_data: any = null;
  message: any = '';
  constructor(public chatService: ChatService, public WebsocketService: WebsocketService) {
    this.WebsocketService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });
  }

  ngOnInit(): void {
    this.chatService.getSessions().subscribe((res: any) => {
      this.sessions = res;
      console.log(this.sessions);
    });
  }
  SetActiveSession(active_id: string) {
    this.active_session = active_id;
    this.getActiveSessionInfo();
    this.chatService.getMessages(active_id).subscribe((res: any) => {
      console.log(res);
      this.messages = res.content;
    });
  }
  getActiveSessionInfo(): any {
    if (this.active_session) {
      this.sessions.map((session: any) => {
        if (session['id'] === this.active_session) {
          this.active_session_data = session;
        }
      });
    }
    return this.active_session_data;
  }
  sendMessage(event: any) {
    if (this.message && this.active_session) {
      this.chatService.sendMessage(this.message, this.active_session).subscribe((res: any) => {});
      this.message = '';
    }
  }
}
