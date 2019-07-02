import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class comprasComponent implements OnInit {
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  // moment = require("moment");
  // moment().format();

  nome: any;
  sobrenome: any;
  datadenascimento: any;
  email: any;
  cpf: any;
  compras: any;
  tem: boolean;

  ngOnInit() {
    this.http
      .get(
        `${environment.API}` + "compra/pessoa/" + this.cookieService.get("id")
      )
      .subscribe(val => {
        //Caso ok
        if (val != "[]") {
          this.compras = val;
          this.tem = true;
        } else {
          this.tem = false;
          this.compras =
            "Você não realizou nenhuma compra. <br> <br> Aproveite acesse a loja virtual do Tuntum e relaize a sua primeira compra!";
        }
      });
  }
}
