import { Component } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ChatService } from '../../../../core/services/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-create-channel-container',
  templateUrl: './chat-create-channel-container.component.html',
  styleUrls: ['./chat-create-channel-container.component.scss'],
})
export class ChatCreateChannelContainerComponent {
  public step_number: number = 1;
  itemsUsers$: Observable<any | Object> = new BehaviorSubject<any[]>([{}]);
  public resource_path = environment.apiToken;
  public selectedUsers: Array<string> = [];
  public selectedUserArray: any = [];
  public groupName: string = '';
  public File: any = '';
  constructor(private chatService: ChatService) {}

  ngAfterViewInit(): void {
    this.itemsUsers$ = this.chatService.getUsersObserver();
    this.itemsUsers$.subscribe((res: any) => {
      if (res) {
        const content = document.querySelector('.users-container');
        const scroll$ = fromEvent(content!, 'scroll').pipe(
          map(() => {
            return content!.scrollTop;
          }),
        );
        scroll$.subscribe(scrollPos => {
          let limit = content!.scrollHeight - content!.clientHeight;
          if (scrollPos === limit) {
            this.getSelectedUsers();
            this.chatService.getMoreUsers();
          }
        });
      }
    });
  }
  toggleCreateChannel() {
    if (this.step_number === 1) {
      this.chatService.showCreateChannelContainer = false;
    } else if (this.step_number === 2) {
      this.step_number = 1;
    }
  }
  nextStep() {
    if (this.step_number === 1) {
      this.step_number++;
      this.groupName = this.getPlaceHolder();
    } else if (this.step_number === 2) {
      this.chatService.createGroup(this.groupName, this.selectedUsers, this.File).subscribe((res: any) => {
        console.log(res);
        this.chatService.showCreateChannelContainer = false;
      });
    }
  }
  getSelectedUsers(): Array<any> {
    let currentValueUsers = this.chatService.getWholeValueOfUsers();
    return currentValueUsers.filter(f => this.selectedUsers.includes(f.id));
  }
  removeSelectedUser(id: string) {
    this.selectedUsers = this.selectedUsers.filter(f => f !== id);
  }
  getPlaceHolder(): string {
    let items = this.getSelectedUsers().map(user => {
      return user.personnel?.firstName || user.personnel?.lastName
        ? `${user.personnel?.firstName}  ${user.personnel?.lastName}`
        : user.username;
    });
    return items.join(',');
  }
  onFileSelected(event: any) {
    let file: File = event.target?.files[0];
    console.log(file);

    if (file) {
      this.File = file;
    }
  }
}
