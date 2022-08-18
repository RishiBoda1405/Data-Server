import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService {

  constructor(public auth: AuthServiceService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const decodedToken = this.auth.getToken();


    if(!this.auth.isAuthenticated() || !this.auth.isAdmin() ){

      this.router.navigate(['/']);
      return false
    }
    return true;
  }

}
