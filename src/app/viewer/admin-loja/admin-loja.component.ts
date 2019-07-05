import { Component, OnInit } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-admin-loja",
  templateUrl: "./admin-loja.component.html",
  styleUrls: ["./admin-loja.component.css"]
})
export class AdminLojaComponent implements OnInit {
  constructor(private app: AppService) {}

  ngOnInit() {}
  cha = this.app.cha;
}
