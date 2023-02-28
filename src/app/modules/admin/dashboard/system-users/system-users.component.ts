import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss'],
})
export class SystemUsersComponent implements OnInit {
  users!: any[];

  ngOnInit(): void {
    this.users = [
      {
        code: '12345678',
        firstName: 'محمد جواد',
        lastName: 'ابوترابی',
        city: 'تهران',
        state: 'تهران',
        activity: 'شهید مطهری',
        role: 'راننده لیفتراک',
      },
      {
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
}
