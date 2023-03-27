import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { MessageService } from 'primeng/api';

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
  totalCount!: boolean;
  foundedUser!: any;

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService
      .getUser({
        pageNumber: 0,
        pageSize: 10,
      })
      .subscribe((res: any) => {
        // this.users = res.content;
      });

    this.users = [
      {
        personnel: {
          firstName: 'امیرحسین',
          lastName: 'بابایی',
        },
        state: 'تهران',
        city: 'تهران',
      },
    ];
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
    this.foundedUser = {
      personnel: {
        firstName: 'امیرحسین',
        lastName: 'بابایی',
      },
      state: 'تهران',
      city: 'تهران',
    };
  }

  addNewUser() {
    this.messageService.add({ severity: 'success', detail: 'کاربر جدید با موفقیت افزوده شد.' });
    this.foundedUser = null;
  }
}
