import { Component } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat-create-group-container',
  templateUrl: './chat-create-group-container.component.html',
  styleUrls: ['./chat-create-group-container.component.scss'],
})
export class ChatCreateGroupContainerComponent {
  public step_number: number = 1;
  itemsUsers$: Observable<any | Object> = new BehaviorSubject<any[]>([{}]);
  public resource_path = environment.apiToken;
  public selectedUsers: Array<string> = [];
  public selectedUserArray: any = [];
  public groupName: string = '';
  public File: any = '';
  public imageSrc: any = '';
  constructor(private chatService: ChatService, private messageService: MessageService) {}

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
  toggleCreateGroup() {
    if (this.step_number === 1) {
      this.chatService.showCreateGroupContainer = false;
    } else if (this.step_number === 2) {
      this.step_number = 1;
    }
  }
  nextStep() {
    if (this.step_number === 1) {
      //this.mes.add({ severity: 'error', detail: err.message ? err.message : err.error.message });
      if (!this.selectedUsers.length) {
        return this.messageService.add({ severity: 'error', detail: 'حداقل یک کاربر باید انتخاب شود.' });
      }
      this.step_number++;
      this.groupName = this.getPlaceHolder();
    } else if (this.step_number === 2) {
      if (!this.File) {
        return this.messageService.add({ severity: 'error', detail: 'باید عکس انتخاب شود.' });
      }
      this.chatService.createGroup(this.groupName, this.selectedUsers, this.File).subscribe((res: any) => {
        this.chatService.showCreateGroupContainer = false;
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
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        this.File = file;
      }
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }
}
