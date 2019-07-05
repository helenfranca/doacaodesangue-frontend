import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "doacaodesangue-frontend";

  user: boolean = false;

  constructor(
    private serviceCookie: CookieService,
    private serviceApp: AppService
  ) {}
  usuario_nome = "";
  usuario_admin;
  usuario_hemocentro;
  // usuario_hemocentro_check;

  ngOnInit() {
    this.usuario_nome = this.serviceCookie.get("nome");
    this.user = this.serviceCookie.check("token");
    this.usuario_admin = this.serviceCookie.check("admin");
    // this.usuario_hemocentro_check = this.serviceCookie.check("hemocentro");
    this.usuario_hemocentro = this.serviceCookie.get("hemocentro");
  }

  logout(): void {
    this.serviceCookie.deleteAll();
    window.location.href = "/";
  }
  cha = this.serviceApp.cha;
}
