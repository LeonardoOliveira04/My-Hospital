import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FireauthService } from './../fire-auth-service.service';
import { FireserviceService } from '../fire-service.service';
import { UserDataInterface } from '../UserData';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form!: FormGroup;
  errorMessage: string = '';
  loading: boolean = true;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private authService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private appService: FireserviceService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      rememberMe: new FormControl(false)
    });

    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && JSON.parse(storedUser).rememberMe) {
      this.tryLogin(JSON.parse(storedUser));
    } else {
      this.loading = false;
    }
  }

  tryLogin(value: { email: any; password: any; rememberMe: any }) {
    this.authService.doLogin(value)
      .then(async (res) => {
        const user: firebase.User = res.user;
        try {
          const userData = await this.authService.getUserData(user.uid) as UserDataInterface;
          this.appService.setUser(user);
          this.userService.setName(userData.name);
          this.userService.setNSaude(userData.nsaude);
          this.userService.setNCidadao(userData.ncidadao);

          if (value.rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(value));
          } else {
            localStorage.removeItem('currentUser');
          }

          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        this.errorMessage = err.message;
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
  
  goChangePassword() {
    this.router.navigate(['/mudar-password']);
  }
}
