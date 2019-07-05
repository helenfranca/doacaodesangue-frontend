import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap, delay, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GerenciaHemocentrosService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<any[]>(`${environment.API}` + "hemocentro").pipe(
      delay(2000),
      tap(console.log) //para debugar, ver os erros
    );
  }
}
