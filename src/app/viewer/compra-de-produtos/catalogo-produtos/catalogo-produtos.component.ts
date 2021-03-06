import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { delay, tap } from "rxjs/operators";
import { map } from "rxjs/operators";

import { CatalogoProdutosService } from "./catalogo-produtos.service";
import { Categoria } from "src/app/model/categoria";
import { Genero } from "src/app/model/genero";
import { Tamanho } from "src/app/model/tamanho";
import { Material } from "src/app/model/material";
import { Produto } from "src/app/model/produto";
import { AppComponent } from "./../../../app.component";
import { CarrinhoDeComprasService } from "./../carrinho-de-compras/carrinho-de-compras.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-catalogo-produtos",
  templateUrl: "./catalogo-produtos.component.html",
  styleUrls: ["./catalogo-produtos.component.css"]
})
export class CatalogoProdutosComponent implements OnInit {
  public categorias: Categoria[];
  public generos: Genero[];
  public tamanhos: Tamanho[];
  public materiais: Material[];
  public produtos: Produto[];
  public sucRequi: boolean = false;

  public filtros = {
    produto: "",
    categoria: [],
    genero: [],
    tamanho: [],
    material: []
  };

  campoCategoria = [];
  campoGenero = [];
  campoMaterial = [];
  campoTamanho = [];

  // Objeto compras, com uma lista de compraProdutos
  compras = {
    compraProdutos: []
  };

  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private catalogoService: CatalogoProdutosService,
    private carrinhoService: CarrinhoDeComprasService
  ) {}

  ngOnInit() {
    this.catalogoService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.catalogoService.getGeneros().subscribe(generos => {
        this.generos = generos;
        this.catalogoService.getTamanhos().subscribe(tamanhos => {
          this.tamanhos = tamanhos;
          this.catalogoService.getMateriais().subscribe(materiais => {
            this.materiais = materiais;
            this.catalogoService
              .getProdutos()
              .subscribe(produtos => (this.produtos = produtos));
          });
        });
      });
    });
  }

  pegaProduto(filtro?) {
    //console.log(filtro);

    // Não funciona na busca de nome de produto,
    this.http
      .get<Produto[]>(`${environment.API}` + "produto", { params: filtro })
      .pipe(
        delay(2000),
        tap()
        //tap(console.log)
      )
      .subscribe(produtos => {
        this.produtos = produtos;
        this.sucRequi = true;
      });
  }

  getCategoria(nome) {
    if (this.filtros.categoria.find(x => x == nome)) {
      this.filtros.categoria = this.filtros.categoria.filter(x => x != nome);
    } else {
      this.filtros.categoria.push(nome);
    }
    this.pegaProduto(this.filtros);
  }

  getGenero(nome) {
    if (this.filtros.genero.find(x => x == nome)) {
      this.filtros.genero = this.filtros.genero.filter(x => x != nome);
    } else {
      this.filtros.genero.push(nome);
    }
    this.pegaProduto(this.filtros);
  }

  getMaterial(nome) {
    if (this.filtros.material.find(x => x == nome)) {
      this.filtros.material = this.filtros.material.filter(x => x != nome);
    } else {
      this.filtros.material.push(nome);
    }
    this.pegaProduto(this.filtros);
  }

  getTamanho(nome) {
    if (this.filtros.tamanho.find(x => x == nome)) {
      this.filtros.tamanho = this.filtros.tamanho.filter(x => x != nome);
    } else {
      this.filtros.tamanho.push(nome);
    }
    this.pegaProduto(this.filtros);
  }

  limpar() {
    this.campoCategoria = [];
    this.campoGenero = [];
    this.campoMaterial = [];
    this.campoTamanho = [];

    this.filtros = {
      produto: "",
      categoria: [],
      genero: [],
      tamanho: [],
      material: []
    };

    this.pegaProduto();
  }

  // Essa função insere no objeto 'compras'um lista
  // essa lista contém os produtos adicionados no carrinho
  // cada produto é um json
  // ou seja, uma lista de json's
  /* Exemplo
  compraProdutos: [
    {
      'id': 1,
      'nome': "compartilhando sangue bom"
    },
    {
      'id': 2,
      'nome': "sou um herói"
    }
  ]
  */
  /*
  comprar(produto) {
    //// ADICIONA
    //console.log(produto);
    // adiciona o produto que foi clicado no botão "adicionar ao carrinho" à lista compraProdutos

    /// TESTE
    //chamando aqui a funcao de carrinho passando o produto
    console.log(produto);
    //this.carrinho.setCarrinho(produto);
    this.http.post('http://localhost:3000/carrinho', produto)
    .pipe(map(res => res))
    .subscribe(dados => console.log(dados))

    window.location.href = "/carrinho";
    //
  }
  */

  // TENTANDO CARRINHO DE NOVO AAAA
  // SESSION_STORAGE
  /*
  testeCompra(key, val) {
    this.app.saveInLocal(key, val);
    console.log('data em catalogo >', this.app.data);
    //window.location.href = "/carrinho";
    
  }
  */

  // AGORA VAI
  addCart(Product) {
    //console.log(Product);
    this.carrinhoService.addItem(Product);
    window.location.href = "/carrinho";
  }
}
