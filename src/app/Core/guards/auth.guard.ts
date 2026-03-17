import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('vehicle_showroom_token')

  if (token) {
    return true //allow access if token exists
  } else {
    router.navigate(['/login']);
    return false;  // block access
  }

};
