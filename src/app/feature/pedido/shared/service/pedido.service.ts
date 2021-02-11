import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Pedido } from '../model/pedido';


@Injectable()
export class PedidoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Pedido[]>(`${environment.endpoint}/pedidos/listar`, this.http.optsName('Listar pedidos'));
  }

  public guardar(pedido: Pedido) {
    return this.http.doPost<Pedido, boolean>(`${environment.endpoint}/pedidos`, pedido,
                                                this.http.optsName('Realizar pedidos'));
  }

}
