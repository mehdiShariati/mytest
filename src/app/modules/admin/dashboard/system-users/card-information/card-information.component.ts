import { Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RoleService } from '../../../../../core/services/role.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GroupService } from '../../../../../core/services/group.service';

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.component.html',
  styleUrls: ['./card-information.component.scss'],
  providers: [ConfirmationService],
})
export class CardInformationComponent implements OnInit {
  newGroup: boolean = false;
  newRole: boolean = false;
  roles!: any;
  groups!: any;
  searchTxtRole!: any;
  searchTxtGroup!: any;
  isSearchingRole: Subject<any> = new Subject<any>();
  isSearchingGroup: Subject<any> = new Subject<any>();
  @Input() userInfo!: any;

  constructor(
    private roleService: RoleService,
    private messageService: MessageService,
    private groupService: GroupService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.isSearchingRole.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.roleService.getRoles({ title: res, pageNumber: 0, pageSize: 5 }).subscribe((res: any) => {
        this.roles = res?.content;
      });
    });

    this.isSearchingGroup.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.groupService.getGroups({ title: res, pageNumber: 0, pageSize: 5 }).subscribe((res: any) => {
        this.groups = res?.content;
      });
    });
  }

  searchingRole() {
    this.isSearchingRole.next(this.searchTxtRole);
  }

  searchingGroup() {
    this.isSearchingGroup.next(this.searchTxtGroup);
  }

  addRole() {
    if (!this.searchTxtRole?.id) {
      this.messageService.add({ severity: 'warn', detail: 'باید نقش مورد نظر خود را انتخاب کنید!' });
      return;
    }

    if (!this.userInfo.roles) {
      this.userInfo.roles = [];
    }

    this.userInfo.roles.map((item: any) => {
      if (item.id == this.searchTxtRole?.id) {
        this.messageService.add({ severity: 'warn', detail: 'نقش انتخاب شده در حال حاضر جزو نقش های شخص می باشد!' });
        this.newRole = false;
        this.searchTxtRole = null;
        return;
      }
    });

    if (this.searchTxtRole) {
      this.messageService.add({ severity: 'success', detail: 'نقش با موفقیت اضافه شد.' });
      this.userInfo?.roles.push(this.searchTxtRole);
      this.newRole = false;
      this.searchTxtRole = null;
    }
  }

  addGroup() {
    if (!this.searchTxtGroup?.id) {
      this.messageService.add({ severity: 'warn', detail: 'باید گروه کاربری مورد نظر خود را انتخاب کنید!' });
      return;
    }

    if (!this.userInfo?.groups) {
      this.userInfo.groups = [];
    }

    this.userInfo.groups.map((item: any) => {
      if (item.id == this.searchTxtGroup?.id) {
        this.messageService.add({
          severity: 'warn',
          detail: 'گروه کاربری انتخاب شده در حال حاضر جزو گروه های کاربری شخص می باشد!',
        });
        this.newGroup = false;
        this.searchTxtGroup = null;
        return;
      }
    });

    if (this.searchTxtGroup) {
      this.messageService.add({ severity: 'success', detail: 'گروه کاربری با موفقیت اضافه شد.' });
      this.userInfo?.groups.push(this.searchTxtGroup);
      this.newGroup = false;
      this.searchTxtGroup = null;
    }
  }

  deleteRole(e: any, role: any) {
    this.confirmationService.confirm({
      target: e.target,
      message: 'آیا مطمئن به انجام این کار هستید؟',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userInfo?.roles?.splice(
          this.userInfo?.roles?.findIndex((item: any) => item?.id == role?.id),
          1,
        );
      },
    });
  }
}
