import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router:Router = inject(Router)
  if (state.url.includes('/admin/item-upload')) {
    if (!sessionStorage.getItem('currentUser')) {
      router.navigate(['/home']);
      return false
    }
  }
  return true
};
