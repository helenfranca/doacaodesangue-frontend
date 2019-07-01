import { Component, OnInit } from "@angular/core";

import { environment } from "src/environments/environment";
import { Hemocentro } from "src/app/model/hemocentro";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-hemocentro",
  templateUrl: "./hemocentro.component.html",
  styleUrls: ["./hemocentro.component.css"]
})
export class hemocentroComponent implements OnInit {
  constructor(private http: HttpClient) {}

  hemocentros: any;

  ngOnInit() {
    this.http
      .get<Hemocentro>(`${environment.API}` + "hemocentro")
      .subscribe(val => {
        //Caso ok
        this.hemocentros = console.log(val);
      });
  }
}
