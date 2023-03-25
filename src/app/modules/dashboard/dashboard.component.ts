import { Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  itemWasDrag!: any;
  loginHistory = [
    {
      platform: 'safari',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'chrome',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'mozila',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'mozila',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'chrome',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'safari',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'safari',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'chrome',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'mozila',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'mozila',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'chrome',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
    {
      platform: 'safari',
      date: '۱۱/۱۲/۱۴۰۱',
      time: '۱۳:۴۵',
    },
  ];

  options = {
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })],
    zoom: 15,
    center: L.latLng(35.705041, 51.355605),
  };

  slides = [
    { id: 1, photo: './assets/images/Space.png' },
    { id: 2, photo: './assets/images/2.png' },
    { id: 3, photo: './assets/images/3.png' },
  ];
  stories = [
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
    { title: 'پارس جنوبی', photo: './assets/images/story-photo.png' },
  ];

  apps = [
    { color: '#FF8389', id: 2, subject: 'خطای سامانه', icon: 'assets/icons/system-error.svg', location: null },
    { color: '#FF7EB6', id: 6, subject: 'پرسشنامه', icon: 'assets/icons/questionnaire.svg', location: null },
    { color: '#42BE65', id: 7, subject: 'اشراف', icon: 'assets/icons/nobles.svg', location: null },
    { color: '#FF8389', id: 8, subject: 'مدیریت پروژه', icon: 'assets/icons/project-management.svg', location: null },
    { color: '#BE95FF', id: 9, subject: 'داشبورد پرسنل', icon: 'assets/icons/personnel-dashboard.svg', location: null },
    { color: '#08BDBA', id: 10, subject: 'وقایع سامانه', icon: 'assets/icons/system-events.svg', location: null },
  ];

  bookmarkedApps = [
    { color: '#42BE65', id: 14, subject: 'چت', icon: 'assets/icons/chat.svg', location: '/app/chat' },
    { color: '#FF8389', id: 11, subject: 'خطای سامانه', icon: 'assets/icons/system-error.svg', location: null },
    { color: '#33B1FF', id: 12, subject: 'نیروی انسانی', icon: 'assets/icons/manpower.svg', location: null },
    { color: '#BE95FF', id: 13, subject: 'طرح و برنامه', icon: 'assets/icons/plan.svg', location: null },
  ];
  @ViewChild('dock') dock!: any;
  @ViewChild('scrollContainer') container!: ElementRef;
  startY!: number | null;

  ngOnInit() {}

  dragStart(item: any) {
    this.itemWasDrag = item;
  }

  dragEnd(doBookmark: boolean = false) {
    if (doBookmark) {
      this.apps.splice(
        this.apps.findIndex(item => item.id == this.itemWasDrag.id),
        1,
      );
      this.bookmarkedApps.push(this.itemWasDrag);
      return;
    }

    this.bookmarkedApps.splice(
      this.bookmarkedApps.findIndex(item => item.id == this.itemWasDrag.id),
      1,
    );
    this.apps.push(this.itemWasDrag);
  }

  onScroll(event: WheelEvent) {
    const myElement = this.container.nativeElement;
    if (event.deltaY > 0) {
      myElement.scrollLeft += 30;
    } else {
      myElement.scrollLeft -= 30;
    }
  }

  ngAfterViewInit() {
    this.container.nativeElement.addEventListener('wheel', this.onScroll.bind(this));
  }
}
