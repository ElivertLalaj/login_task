import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLogin } from '../assets/login';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { count } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  user: string = ''
  squares: boolean[] = Array(9).fill(false);
  lastSelectedIndex: number | null = null;
  ctrlPressed: boolean = false;


  constructor(
    private router: Router,
  ) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      this.user = parsedUser.username;
    }

  }

  toggleSelection(index: number): void {
    if (this.ctrlPressed) {
      this.squares[index] = !this.squares[index];
    } else {
      this.squares.fill(false);
      this.squares[index] = true;
    }
    this.lastSelectedIndex = index;
  }


  @HostListener('window:keydown.shift', ['$event'])
  onShiftKeyDown(event: KeyboardEvent): void {
    if (this.lastSelectedIndex === null) return;

    const rowSize = 3;
    const rowIndex = Math.floor(this.lastSelectedIndex / rowSize);

    for (let i = 0; i < rowIndex; i++) {
      for (let j = 0; j < rowSize; j++) {
        this.squares[i * rowSize + j] = true;
      }
    }

  }


  @HostListener('window:keyup.control', ['$event'])
  onCtrlKeyUp(event: KeyboardEvent): void {
    this.ctrlPressed = false;
  }

  @HostListener('window:keydown.control', ['$event'])
  onCtrlKeyDown(event: KeyboardEvent): void {
    this.ctrlPressed = true;

    if (this.lastSelectedIndex === null) return;

    const rowSize = 3;
    const columnIndex = this.lastSelectedIndex % rowSize;

    for (let i = 0; i < this.squares.length; i++) {
      const col = i % rowSize;
      if (col < columnIndex) {
        this.squares[i] = true;
      }
    }

  }

  onTouchMove(event: TouchEvent): void {

    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains('square')) {
      const index = Number(element.getAttribute('data-index'));
      if (index !== null && !this.squares[index]) {
        this.squares[index] = true;
      }
    }
  }

  onClickGenerateSquare() {

    this.squares.push(false);
  }

  onLogOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
