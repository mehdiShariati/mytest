import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FocusTrapModule } from 'primeng/focustrap';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const PIPES = [];
const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  PaginatorModule,
  MultiSelectModule,
  OverlayPanelModule,
  TableModule,
  ConfirmationService,
  ConfirmDialogModule,
  FocusTrapModule,
  ToastModule,
  SplitButtonModule,
  DropdownModule,
  CheckboxModule,
  InputSwitchModule,
  RadioButtonModule,
  CalendarModule,
  AccordionModule,
  TabViewModule,
  TooltipModule,
  TriStateCheckboxModule,
  DialogModule,
  ProgressSpinnerModule,
];
const COMPONENTS = [];
const DIRECTIVES = [];

@NgModule({
  declarations: [], //[...PIPES, ...DIRECTIVES, ...COMPONENTS]
  imports: [...MODULES],
  exports: [...MODULES], //[...PIPES, ...DIRECTIVES, ...COMPONENTS, ...MODULES],
})
export class SharedModule {}
