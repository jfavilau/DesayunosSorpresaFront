import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPedidoComponent } from './components/listar-pedido/listar-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';


const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
    children: [
      {
        path: 'listar',
        component: ListarPedidoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
