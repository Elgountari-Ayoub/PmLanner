import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)

  if (authService.isAuthenticated() && authService.getAuthToken()) {
    return true
  }
  router.navigate(['/login'])
  return false;
};
