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
  showSpinner: boolean = false;

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
    this.displayModal = false;
    this.newUserModal = false;
  }

  removeId() {
    this.nationalId = null;
  }

  addNewUser(editMode: boolean = false) {
    let groupsId: any = [];
    let rolesId: any = [];

    if (editMode) {
      this.userInfo?.groups?.map((item: any) => groupsId.push(item.id));
      this.userInfo?.roles?.map((item: any) => rolesId.push(item.id));
    } else {
      this.foundedUser?.groups?.map((item: any) => groupsId.push(item.id));
      this.foundedUser?.roles?.map((item: any) => rolesId.push(item.id));
    }

    if (!rolesId?.length) {
      this.messageService.add({ severity: 'warn', detail: 'باید حداقل یک نقش تعریف شود.' });
      return;
    }

    if (editMode) {
      this.userService
        .updateUser(
          {
            groupIds: groupsId,
            roleIds: rolesId,
          },
          this.userInfo.id,
        )
        .subscribe(
          () => {
            this.messageService.add({ severity: 'success', detail: 'اطلاعات کاربر با موفقیت ویرایش شد.' });
            this.userInfo = null;
          },
          err => {
            this.messageService.add({ severity: 'error', detail: err.error.message });
          },
        );
    } else {
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
            if (err.error.message) {
              this.messageService.add({ severity: 'warn', detail: err.error.message });
              return;
            }
            this.messageService.add({ severity: 'error', detail: 'خطایی رخ داده است!' });
          },
        );
    }
  }

  foundProfile() {
    if (!this.nationalId) {
      this.messageService.add({ severity: 'warn', detail: 'کد ملی شخص مورد نظر را وارد کنید!' });
      return;
    }

    this.showSpinner = true;
    this.userService.getMainPersonnel({ nationalId: this.nationalId }).subscribe((res: any) => {
      this.showSpinner = false;
      this.foundedUser = res?.content[0];
    });
  }

  searchUser() {
    this.isSearchingCode.next(this.searchCode);
  }
}
