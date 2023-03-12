import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUser({
        pageNumber: 0,
        pageSize: 10,
      })
      .subscribe((res: any) => {
        this.users = res.content;
        debugger;
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
  }

  removeId() {
    this.searchId = null;
  }
}
