import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CarouselModule } from 'primeng/carousel';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, LeafletModule, CarouselModule, InlineSVGModule, DragDropModule],
})
export class DashboardModule {}
