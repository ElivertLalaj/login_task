import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../assets/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginMode = true;
  loginForm: FormGroup;
  signupForm: FormGroup;

  user: IUser[] = []


  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.user = JSON.parse(storedUsers);
    }
  }


  toggleForm() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSignupClick() {
    const newUser: IUser = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password
    };

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    storedUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(storedUsers));

    this.toggleForm();
    console.log("User signed up:", newUser);
    this.router.navigate(['./login'])
  }

  onLoginClick(): void {

    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    let loginSuccess = false;

    for (let i = 0; i < this.user.length; i++) {
      if (user.username === this.user[i].username && user.password === this.user[i].password) {
        console.log("Login Success");
        localStorage.setItem('currentUser', JSON.stringify(this.user[i]));
        this.router.navigate(["./home"]);
        loginSuccess = true;
      }
    }

    if (!loginSuccess) {
      alert("Username or password is incorrect");
    }


  }

}
