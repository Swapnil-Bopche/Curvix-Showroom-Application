
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  mobileMenuOpen = false;
  openSubmenu: string | null = null;
  _router = inject(Router)

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) {
      this.openSubmenu = null;
    }
  }

  toggleSubmenu(menu: string) {
    this.openSubmenu = this.openSubmenu === menu ? null : menu;
  }

  logout() {
     
    const confirmlogout = confirm('Are you sure you want to logout?');

    if (confirmlogout) {
      localStorage.removeItem('vehicle_showroom_token');
      this._router.navigate(['/login']);
    }

  }
}
