import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEXPATTERNS } from '../../_constants/regex-patterns';
import { AppUserService } from '../../_services/app-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MagicString } from '../../_models/magic-string';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  nameSpan: number = 4;
  inputSpan: number = 19;
  loading: boolean = false;
  errorMsg: string = '';

  //LIFE CYCLES
  constructor(private fb: FormBuilder, private authService: AppUserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  //UI LOGIC
  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(REGEXPATTERNS.password.pattern)]]
    });
  }

  get passwordErrorMsg() { return REGEXPATTERNS.password.errorMsg; }

  validateForm(): boolean {
    let isValid = true;
    for (const control of Object.values(this.loginForm.controls)) {
      if (!control.valid) {
        control.markAllAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
        isValid = false;
      }
    }
    return isValid;
  }

  //API CALLS
  login = async (): Promise<void> => {
    if (!this.validateForm()) return;

    try {
      this.errorMsg = '';
      this.loading = true;
      var result = await this.authService.login(this.loginForm.value);
      localStorage.setItem(MagicString.jwtToken, result.accessToken);
    }
    catch (e) {
      if (e instanceof HttpErrorResponse) {
        this.errorMsg = e.error;
      }
    }
    finally {
      this.loading = false;
    }
  }

  // NAVIGATIONS
}
