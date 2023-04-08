import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService],
})
export class HeaderComponent implements OnInit {
  date!: string;
  day!: string;
  @ViewChild('dateContainer') dateContainer!: ElementRef;
  @ViewChild('clock') clock!: ElementRef;

  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthServiceService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.displayDate();
    this.displayTime();
    setInterval(this.displayTime, 1000);
  }

  ngOnInit(): void {
    this.authService.logOutSubject.subscribe(res => {
      if (res) this.exit();
    });
  }

  displayTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes: any = now.getMinutes();
    let second: any = now.getSeconds();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    this.clock.nativeElement.innerText = hours + ':' + minutes;

    if (hours == 0 && minutes == 0 && second < 1) {
      this.displayDate();
    }
  }

  displayDate() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const weekdays = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    let day = weekdays[dayOfWeek];
    let date = currentDate.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.dateContainer.nativeElement.innerText = `${day} ${date}`;
  }

  exit() {
    this.confirmationService.confirm({
      accept: () => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
