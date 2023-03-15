import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberValidatorDirective } from './directives/number-validator.directive';
import { PersianDatePipe } from './pipes/persian-date.pipe';

@NgModule({
  declarations: [NumberValidatorDirective, PersianDatePipe],
  exports: [NumberValidatorDirective, PersianDatePipe],
  imports: [CommonModule],
})
export class CoreModule {}
