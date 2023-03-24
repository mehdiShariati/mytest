import { Component } from '@angular/core';
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

  slides = ['./assets/images/Space.png', './assets/images/Space.png', './assets/images/Space.png'];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
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
    { id: 1, subject: 'اطلاعات پایه', icon: 'assets/icons/plan.svg' },
    { id: 2, subject: 'خطای سامانه', icon: 'assets/icons/system-error.svg' },
    { id: 3, subject: 'نیروی انسانی', icon: 'assets/icons/manpower.svg' },
    { id: 4, subject: 'طرح و برنامه', icon: 'assets/icons/plan.svg' },
    { id: 5, subject: 'فناوری', icon: 'assets/icons/technology.svg' },
    { id: 6, subject: 'پرسشنامه', icon: 'assets/icons/questionnaire.svg' },
    { id: 7, subject: 'اشراف', icon: 'assets/icons/nobles.svg' },
    { id: 8, subject: 'مدیریت پروژه', icon: 'assets/icons/project-management.svg' },
    { id: 9, subject: 'داشبورد پرسنل', icon: 'assets/icons/personnel-dashboard.svg' },
    { id: 10, subject: 'وقایع سامانه', icon: 'assets/icons/system-events.svg' },
  ];

  bookmarkedApps = [
    { id: 11, subject: 'خطای سامانه', icon: 'assets/icons/system-error.svg' },
    { id: 12, subject: 'نیروی انسانی', icon: 'assets/icons/manpower.svg' },
    { id: 13, subject: 'طرح و برنامه', icon: 'assets/icons/plan.svg' },
  ];

  ngOnInit() {
    // swiper parameters
  }

  dragStart(item: any) {
    this.itemWasDrag = item;
  }

  dragEnd() {
    this.apps.splice(
      this.apps.findIndex(item => item.id == this.itemWasDrag.id),
      1,
    );
    this.bookmarkedApps.push(this.itemWasDrag);
  }
}
