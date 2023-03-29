import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss'],
})
export class SystemUsersComponent implements OnInit {
  users!: any[];
  displayModal: boolean = false;
  newUserModal: boolean = false;
  searchId!: number | null;
  userInfo!: any;
  newGroup: boolean = false;
  newRole: boolean = false;
  foundedUser!: any;
  totalCount!: number;
  searchingUser: Subject<any> = new Subject<any>();
  personnelUserInfo!: any;

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.searchingUser.pipe(debounceTime(700), distinctUntilChanged()).subscribe(res => {
      if (!res.id) {
        this.userService.getMainPersonnel({ nationalId: res }).subscribe((res: any) => {
          this.personnelUserInfo = res?.content;
          this.personnelUserInfo.forEach((item: any) => (item.fullName = item.firstName + ' ' + item.lastName));
        });
      }
    });

    this.userService
      .getUser({
        pageNumber: 0,
        pageSize: 10,
      })
      .subscribe((res: any) => {
        this.users = res.content;
        this.totalCount = res.totalElements;
      });
  }

  showUserInfo(userId: number) {
    this.userInfo = this.users.find(item => item.id == userId);
    this.newGroup = false;
    this.newRole = false;
    this.displayModal = true;
  }

  cancel() {
    this.newGroup = false;
    this.newRole = false;
    this.searchId = null;
    this.foundedUser = null;
  }

  removeId() {
    this.searchId = null;
  }

  searchUser() {
    this.searchingUser.next(this.searchId);
  }

  addNewUser() {
    this.messageService.add({ severity: 'success', detail: 'کاربر جدید با موفقیت افزوده شد.' });
    this.foundedUser = null;
  }

  foundProfile() {
    this.foundedUser = this.searchId;
  }
}
