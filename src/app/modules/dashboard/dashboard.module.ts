import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CarouselModule } from 'primeng/carousel';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SliderComponent } from './components/slider/slider.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [DashboardComponent, SliderComponent],
  imports: [CommonModule, DashboardRoutingModule, LeafletModule, CarouselModule, SwiperModule],
})
export class DashboardModule {}
