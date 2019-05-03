import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from "@ngrx/store";
import { LogIn } from "@store/actions";
import { IAppState, authSlice } from "@store/states";

import { Subscription } from "rxjs";
import { handleAuthStatus, waitNewAuthStatus } from "@shared/helpers/auth.helper";

@Component({
  selector: 'sg-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styles: [ ],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loginErrMsg: string;
  private statusSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.loginErrMsg = null;
  }

  ngOnInit() {
    this.statusSubscription = this.store.select(authSlice).pipe(
      waitNewAuthStatus(),
      handleAuthStatus(
        () => {
          this.loginErrMsg = null;
          this.close();
        },
        () => {
          this.loginErrMsg = `Login failed`;
          setTimeout(() => this.loginErrMsg = null, 2000);
        },
      )
    ).subscribe();

    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.store.dispatch(new LogIn(this.loginForm.value));
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}
