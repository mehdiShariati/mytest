import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  clock!: string;
  date!: string;
  day!: string;

  constructor() {}

  ngOnInit(): void {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const weekdays = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    this.day = weekdays[dayOfWeek];
    this.date = currentDate.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.displayTime();
    setInterval(this.displayTime, 1000);
  }

  displayTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes: any = now.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    this.clock = hours + ':' + minutes;
  }
}
