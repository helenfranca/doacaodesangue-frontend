import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Categoria } from 'src/app/model/categoria';
import { Genero } from 'src/app/model/genero';
import { Produto } from 'src/app/model/produto';
import { tap, delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalogoProdutosService {

  //private readonly API = `${environment.API}categoria`;
  //private readonly API = 'http://localhost:3000/categoria'

  constructor(
    private http: HttpClient
  ) { }


  getCategorias() {
    return this.http.get<Categoria[]>(`${environment.API}categorias`)
  }

  getGeneros() {
    return this.http.get<Genero[]>(`${environment.API}generos`)
  }

  getTamanhos() {
    return this.http.get<Genero[]>(`${environment.API}tamanhos`)
  }

  getMateriais() {
    return this.http.get<Genero[]>(`${environment.API}materiais`)
  }

  getProdutos(filtros?) {
    return this.http.get<Produto[]>(`${environment.API}produto`, {params: filtros })  
  }

  getProdutosBusca(filtros?) {
    return this.http.get<Produto[]>(`${environment.API}produto/busca`, { params: filtros })  
  }
  
  getRecomendacao() {
    return this.http.get<Produto[]>(`${environment.API}top3`);
  }

}
