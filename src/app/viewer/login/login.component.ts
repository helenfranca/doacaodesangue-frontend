import { Component, OnInit, TemplateRef } from "@angular/core";
import { AuthService } from "../guards/auth.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

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
    private modalService: BsModalService
    ) {}

  ngOnInit() {}

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  logar() {
    this.authService.autenticacao(this.usuario);
  }

  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  ok(): void {
    this.modalRef.hide();
  }


}
