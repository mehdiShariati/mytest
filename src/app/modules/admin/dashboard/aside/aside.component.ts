import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  items: { id: number; title: string; icon: string; isSelected: boolean }[] = [
    { id: 1, title: 'کاربران سامانه', icon: 'assets/icons/Users.svg', isSelected: true },
    { id: 2, title: 'پروسه کاری', icon: 'assets/icons/process.svg', isSelected: false },
    { id: 3, title: 'رویداد ها', icon: 'assets/icons/events.svg', isSelected: false },
    { id: 4, title: 'تیکت ها', icon: 'assets/icons/ticket.svg', isSelected: false },
  ];

  constructor() {}

  ngOnInit(): void {}

  change(id: number) {
    this.items.forEach(item => (item.isSelected = false));

    let selectedItem: any = this.items.find(item => item.id == id);
    selectedItem.isSelected = true;
  }
}
