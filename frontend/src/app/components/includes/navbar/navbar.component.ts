import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  toggleMenu() {
    const navMenu = document.getElementById(
      'dropdown-user-menu'
    ) as HTMLElement;
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('block');
  }
}
