import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [ContainerComponent, HeaderComponent],
  imports: [
    CommonModule,
    BadgeModule,
    InputTextModule,
    InlineSVGModule,
    FormsModule,
    ContextMenuModule,
    MenuModule,
    DialogModule,
    ScrollPanelModule,
  ],
})
export class ChatModule {}
