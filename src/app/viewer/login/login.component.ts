import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthService } from "../guards/auth.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CookieService } from "ngx-cookie-service";
import { Message } from "primeng/components/common/message";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario = {
    login: null,
    senha: null
  };

  modalRef: BsModalRef;
  message: string;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private serviceCookie: CookieService,
    private http: HttpClient
  ) { }

  ngOnInit() { }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }
  servidor;
  resposta;
  logar() {
    this.authService.autenticacao(this.usuario);
    this.servidor = this.serviceCookie.get("erro");

    if (this.servidor == "404") {
      this.usuario.senha = "";
      this.usuario.login = "";
      this.resposta = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  ok(): void {
    this.modalRef.hide();
  }

}
