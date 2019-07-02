import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {

  // Pega no html
  usuario: any = {
    nome: null,
    sobrenome: null,
    datanascimento: null,
    sexo: null,
    cpf: null,
    telefone: null,
    email: null,
    senha: null,
    confirmarSenha: null
  };

  // Pega no http post
  user: any = {
    nome: null,
    sobrenome: null,
    datanascimento: null,
    sexo: null,
    cpf: null,
    telefone: null,
    email: null,
    senha: null,
    confirmarSenha: null
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  cadastrar(cadastroForm) {
    //this.usuario = cadastroForm.value
    console.log(this.usuario);
    console.log(this.usuario.nome);

    //this.httpClient.post('https://doacao-de-sangue-helenfranca.c9users.io/pessoa', formulario.value)
    this.httpClient
      //.post(`${environment.API}` + "pessoa", this.usuario)
      .post(`${environment.API}` + "pessoa", cadastroForm.value)
      .pipe(map(res => res))
      .subscribe(dados => {
        this.user = dados;

        console.log(cadastroForm.value);
        console.log('>>>>>>', cadastroForm.value.nome);

        if (cadastroForm.value != null) {
          alert("Usuário cadastrado com sucesso!");
          //window.location.href = "/login";
        }
      });
  }
}
