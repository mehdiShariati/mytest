import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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

  slides = ['./assets/Space.png', './assets/Space.png', './assets/Space.png'];
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
  ngOnInit() {
    // swiper parameters
  }
}
