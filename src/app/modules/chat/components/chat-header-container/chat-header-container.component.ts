import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat-header-container',
  templateUrl: './chat-header-container.component.html',
  styleUrls: ['./chat-header-container.component.scss'],
})
export class ChatHeaderContainerComponent {
  selected_session$: Observable<any> = new BehaviorSubject<any>({});
  public active_session: any;
  public resource_path = environment.apiToken;

  constructor(private chatService: ChatService) {}
  ngOnInit() {
    this.selected_session$ = this.chatService.getSelectedSession();
  }

  toggleThreeDotMenu() {
    this.chatService.toggleThreeDotMenu();
  }
}
