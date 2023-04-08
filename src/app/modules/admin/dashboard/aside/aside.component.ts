import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  items: { id: number; title: string; icon: string; link: null | string }[] = [
    { id: 1, title: 'کاربران سامانه', icon: 'assets/icons/Users.svg', link: '/admin/system-users' },
    { id: 2, title: 'پروسه کاری', icon: 'assets/icons/process.svg', link: null },
    { id: 3, title: 'رویداد ها', icon: 'assets/icons/events.svg', link: null },
    { id: 4, title: 'تیکت ها', icon: 'assets/icons/ticket.svg', link: '/admin/tickets' },
    { id: 5, title: 'نقش ها', icon: 'assets/icons/Favorite.svg', link: '/admin/roles' },
    { id: 6, title: 'گروه های کاری', icon: 'assets/icons/groups.svg', link: '/admin/groups' },
    { id: 7, title: 'تشکیلات', icon: 'assets/icons/organization.svg', link: '/admin/organization' },
    { id: 8, title: 'سازمان ها', icon: 'assets/icons/Bank.svg', link: '/admin/structures' },
  ];

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {}

  exit() {
    this.authService.toggleLogOutModal(true);
  }
}
