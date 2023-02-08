import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.step[0].isActive = true;

    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(8)]],
    });
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
