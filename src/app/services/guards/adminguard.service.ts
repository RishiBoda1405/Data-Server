import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdminguardService {

  constructor(public auth:AuthServiceService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const decodedToken = this.auth.getToken();

      if(!this.auth.isAdmin) {
        this.router.navigate(['/']);
        return false
    }

    return true;
  }
}
