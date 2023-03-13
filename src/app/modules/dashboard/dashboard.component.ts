import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SliderComponent } from './components/slider/slider.component';
import { ProfileService } from '../../core/services/profile-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public profileService: ProfileService) {}

  loginHistory = [];

  options = {
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })],
    zoom: 15,
    center: L.latLng(35.705041, 51.355605),
  };
  profileData: any = {};

  slides = [
    './assets/Space.png',
    'https://dummyimage.com/595x237/',
    'https://dummyimage.com/595x237/',
    'https://dummyimage.com/595x237/',
    './assets/Space.png',
  ];
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
    this.profileService.getLoginHistory().subscribe((res: any) => {
      this.loginHistory = res.content;
    });
    this.profileService.getProfieData().subscribe((res: any) => {
      console.log(res.content);
      this.profileData = res;
      this.profileData.personnel.personnelPhotoUrl =
        environment.apiToken + this.profileData.personnel.personnelPhotoUrl;
    });
  }
}
