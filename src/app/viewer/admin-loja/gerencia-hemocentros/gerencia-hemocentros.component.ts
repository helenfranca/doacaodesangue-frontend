import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, empty, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";


import { GerenciaHemocentrosService } from './gerencia-hemocentros.service';

@Component({
  selector: 'app-gerencia-hemocentros',
  templateUrl: './gerencia-hemocentros.component.html',
  styleUrls: ['./gerencia-hemocentros.component.css']
})
export class GerenciaHemocentrosComponent implements OnInit {

  hemocentros$: Observable<any[]>;
  error$ = new Subject<boolean>();

  // Parao Modal Pop-up
  modalRef: BsModalRef;
  message: string;

  private hemocentro: {
    "id":1,
    "nome": null,
    "cnes": null,
    "email": null,
    "senha": null,
    "telefone": null,
    "status":true,
    "endereco": {
      "id":1,
      "cep": null,
      "numero": null,
      "bairro": {
        "id":1,
        "nome": null,
        "municipio": {
          "id":1,
          "nome": null
        }
      }
    }
  }

  constructor(
    private service: GerenciaHemocentrosService,
    private modalService: BsModalService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.hemocentros$);
    this.hemocentros$ = this.pegaHemocentros();
  }

  pegaHemocentros() {
    return this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

  adicionarHemocentro() {
    let testeHemocentro = this.hemocentro;
    console.log('testeProduto > ', testeHemocentro);
    console.log('this.produto > ', this.hemocentro);

    this.http
      .post(`${environment.API}` + "produto", testeHemocentro)
      .pipe(map(res => res))
      .subscribe(dados => console.log('no subscribe >', dados));

    this.modalRef.hide();
    this.resetaObjetoHemocentro();

    //Lista produtos de novo
    this.hemocentros$ = this.pegaHemocentros();
  }

  resetaObjetoHemocentro() {
    this.hemocentro = {
      "id":1,
      "nome": null,
      "cnes": null,
      "email": null,
      "senha": null,
      "telefone": null,
      "status":true,
      "endereco": {
        "id":1,
        "cep": null,
        "numero": null,
        "bairro": {
          "id":1,
          "nome": null,
          "municipio": {
            "id":1,
            "nome": null
          }
        }
      }
    }

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  cancelar(): void {
    this.modalRef.hide();
  }

}
