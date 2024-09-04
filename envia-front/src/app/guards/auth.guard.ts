import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!sessionStorage.getItem('tk')) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
