import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { REGEXPATTERNS } from '../../_constants/regex-patterns';
import { AuthService } from '../../_services/auth.service';
import { AppUser } from '../../_models/app-user';
import { debounceTime, filter, Subject, switchMap } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading: boolean = false;
  nameSpan: number = 4;
  inputSpan: number = 19;
  errorMsg: string = "";
  userNameAlreadyExist: boolean = false;

  //LIFE CYCLES
  constructor(private fb: FormBuilder, private authService: AuthService, private nzModal: NzModalService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.checkAlreadyExistingUserName();
  }

  //UI LOGIC  
  get passwordErrorMsg(): string { return REGEXPATTERNS.password.errorMsg; }
  get username(): FormControl { return this.signupForm.controls['userName'] as FormControl };

  initializeForm() {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(REGEXPATTERNS.password.pattern)]],
      phoneNumber: ['']
    });
  }

  checkAlreadyExistingUserName() {
    this.username.valueChanges.pipe(
      debounceTime(300),
      filter(searchTerm => searchTerm.trim() !== ''),
      switchMap(searchTerm => this.authService.isUserAlreadyExist(searchTerm))
    ).subscribe(async (searchValue) => {
      this.userNameAlreadyExist = searchValue;
    });
  }

  validateForm(): boolean {
    let isValid = true;
    for (const control of Object.values(this.signupForm.controls)) {
      if (!control.valid) {
        control.markAllAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
        isValid = false;
      }
    }
    return isValid;
  }

  successModal(): void {
    this.nzModal.success({
      nzTitle: 'Success',
      nzContent: 'Yes! Your account has been created successfully.'
    });
  }

  //DATA
  signUp = async (): Promise<void> => {
    if (!this.validateForm() || this.userNameAlreadyExist) return;

    this.loading = true;
    this.errorMsg = '';
    try {
      await this.authService.signup(<AppUser>this.signupForm.value)
      this.successModal();
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
  //NAVIGATIONS
}
