import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() public items: any;
  // config: SwiperOptions = {
  //   slidesPerView: 1,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  //   wrapperClass:"h-98",
  //   rewind:true,
  //
  // };
  // onSwiper(event:any) {
  //   console.log(event);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }
}
