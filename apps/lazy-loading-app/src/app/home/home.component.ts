import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICat, ICreateCatDto, ISignedUser } from '@proto-interface';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../auth/authentication.service';
import { CatsService } from './cats.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: Required<ISignedUser>;
  currentUserSubscription: Subscription;
  cats: Array<Required<ICat>> = [];

  catForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private catsService: CatsService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllCats();
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } { return this.catForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.catForm.invalid) {
      return;
    }

    this.loading = true;
    const createCatDto: Required<ICreateCatDto> = {
      name: this.f.name.value,
      age: this.f.age.value,
    };
    this.catsService.create(createCatDto)
      .pipe(first())
      .subscribe(
        () => {
          this.loadAllCats();
          this.loading = false;
          this.submitted = false;
        },
        ({ error: { message } }) => {
          this.alertService.error(message);
          this.loading = false;
        });
  }

  deleteCat(id: number) {
    this.catsService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllCats();
    });
  }

  private loadAllCats() {
    this.catsService.getAll().pipe(first()).subscribe((cats) => {
      this.cats = cats;
    });
  }
}
