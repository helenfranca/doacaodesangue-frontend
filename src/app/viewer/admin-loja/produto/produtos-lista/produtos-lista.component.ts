import { Component, OnInit, TemplateRef } from "@angular/core";
import { Observable, empty, Subject } from "rxjs";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { catchError, map, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { ProdutosListaService } from "./produtos-lista.service";
import { Produto } from "src/app/model/produto";

@Component({
  selector: "app-produtos-lista",
  templateUrl: "./produtos-lista.component.html",
  styleUrls: ["./produtos-lista.component.css"]
})
export class ProdutosListaComponent implements OnInit {
  //produtos: Produto[];

  //Sempre que tiver um $ do lado é um observable
  //Vai atribuir a variavel produtos$ o : this.service.list()
  produtos$: Observable<Produto[]>;
  error$ = new Subject<boolean>();

  // Parao Modal Pop-up
  modalRef: BsModalRef;
  message: string;

  private produto = {
    id: 15,
    nome: null,
    quantidade: null,
    descricao: '',
    valorunitario: null,
    categoria: null,
    tamanho: 'Não especificado',
    volume: 'Não Possui',
    material: null,
    genero: 'Unissex',
    url: ''
  };

  mostrarTamanhos: boolean = false;
  mostrarVolumes: boolean = false;
  mostrarGeneros: boolean = false;
  mostrarMateriais: boolean = false;

  mostrarMaterialPorcelana: boolean = false;
  mostrarMaterialMalha: boolean = false;
  mostrarMaterialAluminio: boolean = false;
  mostrarMaterialAlgodao: boolean = false;
  mostrarMaterialPlastico: boolean = false;

  constructor(
    private service: ProdutosListaService,
    private modalService: BsModalService,
    private produtosListaService: ProdutosListaService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.produto);

    console.log(this.produtos$);
    this.produtos$ = this.pegaProdutos();
  }

  pegaProdutos() {
    return this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

  setCategoria(tipo) {
    this.produto.categoria = tipo;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  adicionarProduto() {
    //this.produtosListaService.salvarProdutos(this.produto)
    //console.log('formulario > ', formulario.value);
    //console.log('na função > ', this.produto);

    /*
    let testeProduto = 
    {
      "id": 1,
      "nome": "Doe sangue, doe vida!",
      "quantidade": 40,
      "descricao": "",
      "valorunitario": 29.9,
      "categoria": "Botton",
      "tamanho": "M",
      "volume": "Não Possui",
      "material": "Plastico",
      "genero": "Unissex",
      "url": "https://raw.githubusercontent.com/malufreitas/doacao-sangue-front-end/dev-malu/images/botton%20-%20doe%20sangue%20doe%20vida.jpg"
    }
    */


    /*
    let testeProduto = {
      "id": 30,
      "nome": "Eu sou doador",
      "quantidade": 50,
      "descricao": "",
      "valorunitario": 25.5,
      "categoria": "Caneca",
      "tamanho": "Não Possui",
      "volume": "Não Possui",
      "material": "Porcelana",
      "genero": "Unissex",
      "url": "https://raw.githubusercontent.com/malufreitas/doacao-sangue-front-end/dev-malu/images/caneca%20-%20doador.jpg"
    }
    */


    let testeProduto = this.produto;
    console.log('testeProduto > ', testeProduto);
    console.log('this.produto > ', this.produto);

    this.http
      .post(`${environment.API}` + "produto", testeProduto)
      .pipe(map(res => res))
      .subscribe(dados => console.log('no subscribe >', dados));

    this.modalRef.hide();
    this.resetaObjetoProduto();

    //Lista produtos de novo
    this.produtos$ = this.pegaProdutos();
  }

  removerProduto(produto) {
    console.log(produto)
    this.http
      .delete(`${environment.API}` + "produto", produto)
      .pipe(take(1))
      .subscribe(dados => console.log('no subscribe >', dados));
  }


  resetaObjetoProduto() {
    this.produto = {
      id: 8,
      nome: null,
      quantidade: null,
      descricao: '',
      valorunitario: null,
      categoria: null,
      tamanho: 'Não especificado',
      volume: 'Não Possui',
      material: null,
      genero: 'Unissex',
      url: ''
    };
  }

  cancelar(): void {
    this.modalRef.hide();
  }

  showOpcoesCamisa() {
    this.mostrarTamanhos = true;
    this.mostrarGeneros = true;
    this.mostrarMateriais = true;

    this.mostrarMaterialPorcelana = false;
    this.mostrarMaterialMalha = true;
    this.mostrarMaterialAluminio = false;
    this.mostrarMaterialAlgodao = true;
    this.mostrarMaterialPlastico = false;
  }

  showOpcoesCaneca() {
    this.mostrarTamanhos = false;
    this.mostrarGeneros = false;
    this.mostrarMateriais = true;


    this.mostrarMaterialPorcelana = true;
    this.mostrarMaterialMalha = false;
    this.mostrarMaterialAluminio = true;
    this.mostrarMaterialAlgodao = false;
    this.mostrarMaterialPlastico = true;
  }

  showOpcoesButton() {
    this.mostrarTamanhos = true;
    this.mostrarGeneros = false;
    this.mostrarMateriais = true;

    this.mostrarMaterialPorcelana = false;
    this.mostrarMaterialMalha = false;
    this.mostrarMaterialAluminio = true;
    this.mostrarMaterialAlgodao = false;
    this.mostrarMaterialPlastico = true;
  }


}
