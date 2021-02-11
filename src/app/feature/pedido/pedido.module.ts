import { NgModule } from '@angular/core';

import { PedidoRoutingModule } from './pedido-routing.module';
import { ListarPedidoComponent } from './components/listar-pedido/listar-pedido.component';
import { RealizarPedidoComponent } from './components/realizar-pedido/realizar-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { SharedModule } from '@shared/shared.module';
import { PedidoService } from './shared/service/pedido.service';
import { CalendarService } from './shared/service/calendar.service';


@NgModule({
  declarations: [
    ListarPedidoComponent,
    RealizarPedidoComponent,
    PedidoComponent
  ],
  imports: [
    PedidoRoutingModule,
    SharedModule
  ],
  providers: [
    PedidoService,
    CalendarService,
  ]
})
export class PedidoModule { }
