import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NumberValidatorDirective} from "../../../core/directives/number-validator.directive";

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
  public upperLowerRegex = /(?=[A-Za-z@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z]).*$/;

  constructor(private fb: FormBuilder) {
  }

  password = new FormControl('', [Validators.required, NumberValidatorDirective.forbiddenNameValidator, Validators.minLength(8)]);
  confirmPassword = new FormControl(['', Validators.required]);

  ngOnInit(): void {
    this.myForm = new FormGroup<any>({
        password: this.password,
        confirmPassword: this.confirmPassword,
      }
    )
  }

  //   this.myForm = this.fb.group({
  //     password: ['', [Validators.required,NumberValidatorDirective.forbiddenNameValidator]],
  //     confirmPassword: ['', Validators.required],
  //   });
  // }

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

  test() {
    console.log(this.myForm)
  }

  // validateUpperLowerPattern(c: FormControl) {
  //   let upperLowerRegex = /(?=[A-Za-z@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z]).*$/;
  //   if (c.dirty && c.value.name.test(upperLowerRegex)) {
  //     // DO your logic here using pattern to return true/false
  //     return {
  //       validateConditionalPattern: {
  //         valid: false
  //       }
  //     }
  //     return null;
  //   }
  // }

  checkValidator(control: any): ValidationErrors | null {
    let upperLowerRegex = /(?=[A-Za-z@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z]).*$/;
    let numberRegex = /(?=.*[0-9])(?=.{8,}).*$/;
    console.log()

    let ulTest = upperLowerRegex.test(control.get('password')?.value);
    let nTest = numberRegex.test(control.get('password')?.value);

    if (ulTest && nTest) {
      return null
    } else if (ulTest) {
    }

    return {ulTest, nTest}
  }
}
