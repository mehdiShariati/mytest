import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.users = [
      {
        id: 1,
        code: '12345678',
        firstName: 'محمد جواد',
        lastName: 'ابوترابی',
        city: 'تهران',
        state: 'تهران',
        activity: 'شهید مطهری',
        role: 'راننده لیفتراک',
      },
      {
        id: 2,
        code: '12345678',
        firstName: 'محمد جواد',
        lastName: 'ابوترابی',
        city: 'تهران',
        state: 'تهران',
        activity: 'شهید مطهری',
        role: 'راننده لیفتراک',
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
  }

  removeId() {
    this.searchId = null;
  }
}
