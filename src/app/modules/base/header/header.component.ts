import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  date!: string;
  day!: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.displayDate();
    this.displayTime();
    setInterval(this.displayTime, 1000);
  }

  displayTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes: any = now.getMinutes();
    let second: any = now.getSeconds();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let clock: any = document.getElementById('clock');
    clock.textContent = hours + ':' + minutes;

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

    let res: any = document.getElementById('date');
    res.textContent = `${day} ${date}`;
  }
}
