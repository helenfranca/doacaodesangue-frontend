import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CadastroComponent } from './cadastro.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    CadastroComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    CadastroComponent
  ]
})
export class CadastroModule { }
