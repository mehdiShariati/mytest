import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NumberValidatorDirective} from "../../../core/directives/number-validator.directive";
import {AuthServiceService} from "../../../core/services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  myForm!: FormGroup;
  show1: boolean = false;
  show2: boolean = false;
  @ViewChild('inputPass1') passwordInput1!: ElementRef;
  @ViewChild('inputPass2') passwordInput2!: ElementRef;
  notRobot: boolean = false;
  wrongPassword: boolean = false;
  checked!: boolean;
  loading: boolean = true;
  data!: any;
  captchaImage!: string;

  constructor(private authService: AuthServiceService,
              private router: Router
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
    if (!this.data) {
      this.router.navigate(['auth/login']);
      return;
    }
  }


  password: any = new FormControl('', [Validators.required, NumberValidatorDirective.forbiddenNameValidator, Validators.minLength(8)]);
  confirmPassword: any = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.myForm = new FormGroup<any>({
      username: new FormControl(this.data.username),
      oldPassword: new FormControl(this.data.password),
      newPassword: this.password,
      confirmPassword: this.confirmPassword,
      captchaId: new FormControl('', Validators.required),
      captchaValue: new FormControl('', Validators.required)
    });

    this.authService.getCaptcha('').subscribe((res: any) => {
      this.loading = false;
      this.captchaImage = res.captchaBase64;
      this.myForm.get('captchaId')?.setValue(res.id);
    })
  }

  showPassword(isShow1: boolean = false) {
    if (isShow1) {
      this.show1 = !this.show1;

      if (this.passwordInput1.nativeElement.type == "password") {
        this.passwordInput1.nativeElement.type = "text";
      } else {
        this.passwordInput1.nativeElement.type = "password";
      }
    } else {
      this.show2 = !this.show2;

      if (this.passwordInput2.nativeElement.type == "password") {
        this.passwordInput2.nativeElement.type = "text";
      } else {
        this.passwordInput2.nativeElement.type = "password";
      }
    }
  }

  submit() {
    let model = this.myForm.value;
    if (model.newPassword !== model.confirmPassword) {
      return;
    }

    this.authService.changeTemporaryPassword(model).subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}
