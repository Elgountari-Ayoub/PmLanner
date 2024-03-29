import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/Models/Auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  auth!: Auth;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const authUser = this.authService.getAuthUser();
    if (authUser) this.auth = authUser;
  }
  toggleMenu() {
    const navMenu = document.getElementById(
      'dropdown-user-menu'
    ) as HTMLElement;
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('block');
  }
}
