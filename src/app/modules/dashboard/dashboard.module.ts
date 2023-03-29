import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CarouselModule } from 'primeng/carousel';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { DockModule } from 'primeng/dock';
import { JalaliPipe } from '../../core/pipes/jalali.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [DashboardComponent, JalaliPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LeafletModule,
    CarouselModule,
    InlineSVGModule,
    DragDropModule,
    TooltipModule,
    DockModule,
    ProgressSpinnerModule,
  ],
  exports: [JalaliPipe],
})
export class DashboardModule {}
