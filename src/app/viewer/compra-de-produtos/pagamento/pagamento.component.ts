import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pagarme from 'pagarme/browser'


import { CarrinhoDeComprasService } from './../carrinho-de-compras/carrinho-de-compras.service';
import { CookieService } from 'ngx-cookie-service';

declare let paypal: any;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})


export class PagamentoComponent implements AfterViewChecked {

  // Paypal
  addScript: boolean = false;
  paypalLoad: boolean = true;

  totalAmount;


  endereco_cobranca: {};
  compra: {};
  // Paypal


  // Boleto fácil

  // Boleto fácil


  constructor(
    private http: HttpClient,
    private carrinhoService: CarrinhoDeComprasService,
    private cookieService: CookieService
  ) { }


  ngOnInit() {
    this.totalAmount = this.carrinhoService.total();
    console.log('total >>>', this.totalAmount);
  }



  // Paypal
  paypalConfig = {
    env: 'sandbox',

    client: {
      sandbox: 'AUEDVkrWlzl7mq2ThdFIz5kB2i-Wa5fZZ-qZ8uRPzkSYnFKfORWcx71V1vq2OwArTUD47LMTMAP8oyKE',
      production: '<your-production-key here>'
    },

    commit: true,
    payment: (data, actions) => {

      return actions.payment.create({
        payment: {
          transactions: [
            // ****** O valor fixo do pagamento vai vir aqui
            { amount: { total: this.totalAmount, currency: 'BRL' } }
          ]
        }
      });

    },

    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        window.alert('Pagamento efetuado!');
        window.location.href = "/finalizacompra";

        this.endereco_cobranca = {
          'rua': payment.payer.payer_info.shipping_address.line1,
          'bairro': payment.payer.payer_info.shipping_address.line2,
          'cidade': payment.payer.payer_info.shipping_address.city,
          'estado': payment.payer.payer_info.shipping_address.state,
          'cep': payment.payer.payer_info.shipping_address.postal_code
        };

        this.compra = {
          'status': payment.state,  // payment.payer.status ??
          'data': payment.create_time,
          'pagamento': payment.payer.payment_method,
          'valorTotal': payment.trasactions.amount.total,  //this.totalAmount
          'idendereco': 0,
          'idpessoa': 0
        }

        console.log(payment.payer.payer_info.shipping_address);
        // Passar para o back-end por metodo HTTP
        // endereco_cobranca
        // compra
      })
    }

  };


  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }


  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  // Paypal



  //Boleto pagar.me
  addBoletoScript() {
    pagarme.client.connect({ api_key: 'ak_test_77BOmL1rQESkHJK8MwpDOmtO9ASGY8' })
      .then(client => client.transactions.create({
        amount: this.totalAmount*100,
        payment_method: 'boleto',
        postback_url: 'http://requestb.in/pkt7pgpk',
        customer: {
          type: 'individual',
          country: 'br',
          name: this.cookieService.get("nome"),   // 'Aardvark Silva',
          documents: [
            {
              type: 'cpf',
              number: this.cookieService.get("cpf"),
            },
          ],
        },
      }))


  }


  /*
  addBoletoScript(code) {
    this.http.post('https://sandbox.boletobancario.com/boletofacil/integration/button/checkout.html', code)
      .subscribe();
  }
  */

  totalCompra(): number {
    return this.totalAmount;
  }

}
