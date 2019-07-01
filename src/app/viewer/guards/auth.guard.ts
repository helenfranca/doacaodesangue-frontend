import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, //Informações da rota
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    //Retorna um observable

    if (
      this.cookieService.check("token") &&
      !this.cookieService.check("admin")
    ) {
      return true;
    }
    if (!this.cookieService.check("token")) {
      this.router.navigate(["/login"]);
    }
    return false;
  }
}
