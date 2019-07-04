import { Component, OnInit } from '@angular/core';

import { Relatorio3 } from 'src/app/model/relatorio3';
import { Relatorio3Service } from './relatorio3.service';

@Component({
  selector: 'app-relatorio3',
  templateUrl: './relatorio3.component.html',
  styleUrls: ['./relatorio3.component.css']
})
export class Relatorio3Component implements OnInit {

  private demandas;

  constructor(
    private service: Relatorio3Service
  ) { 
  }

  ngOnInit() {
   this.demandas = this.getDemandas();
   //this.montaRelatorio(this.demandas);
  }


  getDemandas() {
    return this.service.list()
    .subscribe(dados => this.demandas = dados);
  }

  montaRelatorio(demandas) {

    /*
    for (let i in demandas) {
      console.log(demandas[i]);    
    }
    */
  
  }

}
