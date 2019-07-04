import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  resposta: void;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService //,private loginComponent: LoginComponent
  ) {}

  salvaCookie(resposta) {
    let dt = new Date();

    this.cookieService.set(
      "token",
      resposta.access_token,
      dt.setHours(dt.getHours() + 1)
    );
    this.cookieService.set("tempo_sessao", resposta.expires_in);
    this.cookieService.set("id", resposta.user_id.id);
    this.cookieService.set("nome", resposta.user_id.nome);
    this.cookieService.set("sobrenome", resposta.user_id.sobrenome);
    this.cookieService.set("datanascimento", resposta.user_id.datanascimento);
    this.cookieService.set("cpf", resposta.user_id.cpf);
    this.cookieService.set("sexo", resposta.user_id.sexo);
    this.cookieService.set("email", resposta.user_id.email);
    this.cookieService.set("telefone", resposta.user_id.telefone);
    if (resposta.user_id.admin != null) {
      this.cookieService.set("admin", resposta.user_id.admin);
      this.cookieService.set("hemocentro", resposta.user_id.hemocentro);
      this.cookieService.set("cnes", resposta.user_id.cnes);
    }
  }

  login(resposta) {
    if (resposta.status == 404) {
      this.cookieService.set("erro", resposta.status);
    } else if (resposta.status == 200) {
      this.salvaCookie(resposta);
      this.usuarioAutenticado = true;
      // Direcionar para tela:
      if (
        this.cookieService.check("token") &&
        this.cookieService.get("admin").slice(0, 4) == "HEMO"
      ) {
        window.location.href = "/hemocentro";
      } else if (
        this.cookieService.check("token") &&
        this.cookieService.get("admin").slice(0, 3) == "SIS"
      ) {
        window.location.href = "/sistema";
      } else {
        window.location.href = "/usuario";
      }
    }
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(["/"]);
  }

  async autenticacao(formulario) {
    await this.http
      .post<any>(`${environment.API}` + "auth/login", formulario)
      .pipe()
      .subscribe(
        success => {
          this.login(success);
        } //resposta do servidor com o status 404 ou 200
      );
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
