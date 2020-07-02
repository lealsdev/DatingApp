import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  @Output()
  cancelEvent = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    /*this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);*/

    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
        confirmPassword: ['', Validators.required],
        gender: ['male'],
        knownAs: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {

    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration successful')
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.router.navigate(['/members']);
        }
      );
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }


}
