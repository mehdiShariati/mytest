import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  checked!: boolean;
  notRobot: boolean = false;
  wrongPassword: boolean = false;
  @ViewChild('inputPass') passwordInput!: ElementRef;
  step: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  captchaImage!: string;
  myForm!: FormGroup;
  displayModal: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
      return;
    }
  }

  ngOnInit(): void {
    this.step[0].isActive = true;

    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captchaId: '',
      captchaValue: '',
    });
  }

  showPassword() {
    this.show = !this.show;

    if (this.passwordInput.nativeElement.type == 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }

  submit() {
    if (this.myForm.invalid) {
      return;
    }

    this.authService.login(this.myForm.value).subscribe(
      res => {
        this.notRobot = false;
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh-token', res.refresh_token);
        this.router.navigate(['/dashboard']);
      },
      res => {
        if (res.status == 428 && res.error.fingerPrint == 'temporary.password') {
          this.router.navigate(['/auth/new-password'], { state: this.myForm.value });
          return;
        }

        this.getCaptcha();
      },
    );
  }

  getCaptcha() {
    this.authService.getCaptcha('').subscribe((res: any) => {
      this.notRobot = true;
      this.captchaImage = res.captchaBase64;
      this.myForm.get('captchaId')?.setValue(res.id);
    });
  }
}
