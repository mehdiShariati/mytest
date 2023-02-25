import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  items: { title: string; icon: string; isSelected: boolean }[] = [
    { title: 'کاربران سامانه', icon: 'assets/icons/Users.svg', isSelected: false },
    { title: 'پروسه کاری', icon: 'assets/icons/process.svg', isSelected: false },
    { title: 'رویداد ها', icon: 'assets/icons/events.svg', isSelected: false },
    { title: 'تیکت ها', icon: 'assets/icons/ticket.svg', isSelected: false },
  ];

  constructor() {}

  ngOnInit(): void {}
}
