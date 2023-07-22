import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from './../fire-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  validations_form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }],
    'nsaude': [
        { type: 'required', message: 'NSaude is required.' },
        { type: 'pattern', message: 'NSaude must be a 9-digit number.' }
      ],
    'ncidadao': [
        { type: 'required', message: 'NCidadao is required.' },
        { type: 'pattern', message: 'NCidadao must be an 8-digit number.' }
      ]
  };

  constructor(
    private authService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      nsaude: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      ncidadao: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{8}')])]
    });
  }

  tryRegister(value: { name:any; email: any; password: any; ncidadao: any; nsaude: any}) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please login.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
  goLoginPage() {
    this.router.navigate(["/login"]);
  }
}