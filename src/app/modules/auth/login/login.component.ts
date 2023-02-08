import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  checked!: boolean;
  notRobot: boolean = false;
  wrongPassword: boolean = false;
  @ViewChild('inputPass') passwordInput!: ElementRef;
  step: any[] = [
    {id: 1},
    {id: 2},
    {id: 3}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.step[0].isActive = true;
  }

  showPassword() {
    this.show = !this.show;

    if (this.passwordInput.nativeElement.type == "password") {
      this.passwordInput.nativeElement.type = "text";
    } else {
      this.passwordInput.nativeElement.type = "password";
    }
  }
}
