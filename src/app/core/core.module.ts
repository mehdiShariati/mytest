import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberValidatorDirective } from './directives/number-validator.directive';
import { PersianDatePipe } from './pipes/persian-date.pipe';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom-directive';

@NgModule({
  declarations: [NumberValidatorDirective, PersianDatePipe, ScrollToBottomDirective],
  exports: [NumberValidatorDirective, PersianDatePipe],
  imports: [CommonModule],
})
export class CoreModule {}
