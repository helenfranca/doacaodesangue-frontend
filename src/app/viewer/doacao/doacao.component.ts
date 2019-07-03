import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { Doacao } from "src/app/model/doacao";

@Component({
  selector: "app-doacao",
  templateUrl: "./doacao.component.html",
  styleUrls: ["./doacao.component.css"]
})
export class doacaoComponent implements OnInit {
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  // moment = require("moment");
  // moment().format();

  a: any;
  b: any;
  cpf: any;
  resposta: any;
  retorno: any;
  ret: boolean;

  ngOnInit() {
    // this.nome = this.cookieService.get("nome");
    // this.sobrenome = this.cookieService.get("sobrenome");
    // // this.datadenascimento = this.moment("12/25/1995", "MM-DD-YYYY");
    // this.cookieService.get("datanascimento");
    // this.id = this.cookieService.get("id");
    // this.cpf = this.cookieService.get("cpf");
    // this.moment.format();

    if (
      this.cookieService.get("cpf").search(".") ||
      this.cookieService.get("cpf").search("-")
    ) {
      this.a = this.cookieService.get("cpf").split("-");
      this.b = this.a[0].split(".");
      this.cpf = this.b.concat(this.a[1]).join("");
    }

    this.http.get(`${environment.API}` + "doacao/pessoa/" + this.cpf).subscribe(
      val => {
        this.retorno = val;
        this.ret = true;
      },
      error => {
        error = error;
      }
    );
  }
}
