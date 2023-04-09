import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent {
  tickets!: any;
  displayModal: boolean = false;
  userInfo!: any;
  isCheckingTicket: boolean = false;
  show: boolean = false;
  @ViewChild('inputPass') passwordInput!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  checkTicket() {
    this.isCheckingTicket = true;
  }

  showPassword() {
    this.show = !this.show;

    if (this.passwordInput.nativeElement.type == 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }
}
