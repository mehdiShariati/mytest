import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss'],
})
export class SystemUsersComponent implements OnInit {
  users!: any[];
  displayModal: boolean = false;
  newUserModal: boolean = false;
  nationalId!: any;
  userInfo!: any;
  newGroup: boolean = false;
  newRole: boolean = false;
  foundedUser!: any;
  totalCount!: number;
  personnelUserInfo!: any;
  notFoundUser: boolean = false;
  searchCode!: string;
  isSearchingCode: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.isSearchingCode.pipe(debounceTime(500), distinctUntilChanged()).subscribe((res: any) => {
      this.userService
        .getUser({
          pageNumber: 0,
          pageSize: 10,
        })
        .subscribe((res: any) => {
          this.users = res.content;
        });
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
    this.nationalId = null;
    this.foundedUser = null;
  }

  removeId() {
    this.nationalId = null;
  }

  addNewUser() {
    let groupsId: any = [];
    let rolesId: any = [];

    this.foundedUser?.groups?.map((item: any) => groupsId.push(item.id));
    this.foundedUser?.roles?.map((item: any) => rolesId.push(item.id));

    if (!rolesId?.length) {
      this.messageService.add({ severity: 'warn', detail: 'باید حداقل یک نقش تعریف شود.' });
      return;
    }

    if (!groupsId?.length) {
      this.messageService.add({ severity: 'warn', detail: 'باید حداقل یک گروه کاربری تعریف شود.' });
      return;
    }

    this.userService
      .addUser({
        mainPersonnelId: this.foundedUser.id,
        groupIds: groupsId,
        roleIds: rolesId,
      })
      .subscribe(
        () => {
          this.messageService.add({ severity: 'success', detail: 'کاربر جدید با موفقیت افزوده شد.' });
          this.foundedUser = null;
          this.nationalId = null;
        },
        err => {
          if (err.error.message == 'personnel already assigned.') {
            this.messageService.add({ severity: 'warn', detail: 'این شخص هم اکنون در لیست کاربران سامانه قرار دارد!' });
            return;
          }
          this.messageService.add({ severity: 'error', detail: 'خطایی رخ داده است!' });
        },
      );
  }

  foundProfile() {
    this.userService.getMainPersonnel({ nationalId: this.nationalId }).subscribe((res: any) => {
      this.foundedUser = res?.content[0];
    });
  }

  searchUser() {
    this.isSearchingCode.next(this.searchCode);
  }
}
