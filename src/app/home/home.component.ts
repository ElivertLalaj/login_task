import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../assets/login';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(
    private router: Router
  ){}

  onLogOut() {
    localStorage.removeItem('currentUser');
  
  // Redirect to login page
  this.router.navigate(['/login']);
  }
  
}
