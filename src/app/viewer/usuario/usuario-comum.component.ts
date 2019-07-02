import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-usuario-comum",
  templateUrl: "./usuario-comum.component.html",
  styleUrls: ["./usuario-comum.component.css"]
})
export class usuarioComumComponent implements OnInit {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  pessoa: any;
  doador = false;
  a: any;
  b: any;
  cpf: any;
  ngOnInit() {
    if (
      this.cookieService.get("cpf").search(".") ||
      this.cookieService.get("cpf").search("-")
    ) {
      this.a = this.cookieService.get("cpf").split("-");
      this.b = this.a[0].split(".");
      this.cpf = this.b.concat(this.a[1]).join("");
    }

    this.http
      .get<any>(`${environment.API}` + "pessoa/doador/" + this.cpf)
      .subscribe(
        val => {
          this.pessoa = val;
          if (this.pessoa.apto) {
            this.doador = true;
          }
        },
        error => {
          error = error;
        }
      );
  }
}
